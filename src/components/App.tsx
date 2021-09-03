import React, { useState, ReactElement } from "react";
import { Card, Content, Container, Form, Button } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Bubble from "./Bubble";
import buildings from "../data/buildings.json";

function App(): ReactElement {
  // Configuration constants
  const defaultMessage =
    "Use la barra de búsqueda o haga click al lugar que quiera identificar.";
  const defaultErrorMessage = "No se encontró ningún edificio con ese nombre.";

  // Helper function to put everything in lower-case and remove accents
  function standardize(str: string) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  }

  function buildResultMessage(idx: number) {
    if (idx === 0) return defaultMessage;
    else if (idx === -1) return defaultErrorMessage;
    return `(${idx}) ${buildings[idx].title}`;
  }

  // State variables
  const [searchResult, setSearchResult] = useState(0);

  let imageBoundingRect: DOMRect | undefined;
  const [imageTop, setImageTop] = useState(0);
  const [imageLeft, setImageLeft] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  const [listExpanded, setListExpanded] = useState(false);

  // Event listeners
  function updateImageProportions() {
    imageBoundingRect = document
      ?.getElementById("Mapa-UPRM")
      ?.getBoundingClientRect();

    setImageTop(imageBoundingRect?.top || 0);
    setImageLeft(imageBoundingRect?.left || 0);
    setImageWidth(imageBoundingRect?.width || 0);
    setImageHeight(imageBoundingRect?.height || 0);
  }

  // Add event listeners to update image size and position state
  ["load", "zoom", "orientationchange", "scroll"].forEach((event: string) =>
    window.addEventListener(event, updateImageProportions)
  );

  function imageWasClicked(event: React.MouseEvent<HTMLImageElement>) {
    event.preventDefault();
    updateImageProportions();

    const clickTop = event.clientY;
    const clickLeft = event.clientX;

    buildings.forEach((element, idx: number) => {
      const dTop = element.top - ((clickTop - imageTop) / imageHeight) * 100;
      const dLeft = element.left - ((clickLeft - imageLeft) / imageWidth) * 100;
      const radius = element.radius;

      if (dTop * dTop + dLeft * dLeft <= radius * radius)
        setSearchResult(searchResult === idx ? 0 : idx);
    });
  }

  function searchQueryChanged(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    updateImageProportions();

    function DamerauLeveshteinDistance(a: string, b: string): number {
      const d: Array<Array<number>> = [];

      for (let i = 0; i <= a.length; i++) {
        const temp = [];
        for (let j = 0; j <= b.length; j++) temp.push(0);
        d.push(temp);
      }

      for (let i = 0; i <= a.length; i++) d[i][0] = i;
      for (let j = 0; j <= b.length; j++) d[0][j] = j;

      for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
          const cost = a[i - 1] === b[j - 1] ? 0 : 1;

          d[i][j] = Math.min(
            d[i - 1][j] + 1,
            d[i][j - 1] + 1,
            d[i - 1][j - 1] + cost
          );

          if (i > 2 && j > 2 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1])
            d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
        }
      }

      return d[a.length][b.length];
    }

    const query = standardize(event.currentTarget.value);

    // Return early if query is empty
    if (query.length == 0) return setSearchResult(0);

    // First make the most to match `literal_matches`
    if (
      !buildings.every((element: BuildingsType, idx: number) => {
        if (element.literal_matches.includes(query)) {
          setSearchResult(idx);
          return false;
        }
        return true;
      })
    )
      return;

    // Otherwise find match with the smallest Damerau Leveshtein Distance
    let closestElement = -1;
    let closestScore = Number.MAX_SAFE_INTEGER;

    buildings.forEach((element: BuildingsType, idx: number) => {
      element.search_terms.forEach((term: string) => {
        const standardizedTerm = standardize(term);
        const score =
          DamerauLeveshteinDistance(query, standardizedTerm) /
          standardizedTerm.length;

        if (score < closestScore) {
          closestElement = idx;
          closestScore = score;
        }
      });
    });

    setSearchResult(closestElement);
  }

  return (
    <Content>
      {/*  _  _             _          */}
      {/* | || |___ __ _ __| |___ _ _  */}
      {/* | __ / -_) _` / _` / -_) '_| */}
      {/* |_||_\___\__,_\__,_\___|_|   */}
      <h1 className="my-5 is-size-1-desktop is-size-3-touch has-text-white has-text-centered">
        Mapa Interactivo UPRM
      </h1>
      <Card
        className="py-4 px-5 mx-a"
        style={{ width: "100vw", maxWidth: "1000px" }}
      >
        {/*  _____        _     _                _    */}
        {/* |_   _|____ _| |_  (_)_ _  _ __ _  _| |_  */}
        {/*   | |/ -_) \ /  _| | | ' \| '_ \ || |  _| */}
        {/*   |_|\___/_\_\\__| |_|_||_| .__/\_,_|\__| */}
        {/*                           |_|             */}
        <form>
          <Form.Field>
            <Form.Label className="is-size-4-touch is-size-2-desktop">
              Búsqueda
            </Form.Label>
            <Form.Control className="has-icons-left">
              <Form.Input
                id="searchInput"
                type="search"
                placeholder="Stefani"
                className="is-size-5"
                onChange={searchQueryChanged}
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                  if (event.keyCode === 13) {
                    event.preventDefault();
                    event.currentTarget.blur();
                  }
                }}
              />

              <span className="icon is-large is-left">
                <FontAwesomeIcon
                  transform="grow-12 down-6 right-6"
                  icon={faSearch}
                />
              </span>
            </Form.Control>
          </Form.Field>
        </form>

        <Card.Content className="p-0">
          {buildings.map((element: BuildingsType, idx: number) => (
            <Bubble
              key={idx}
              top={(element.top / 100.0) * imageHeight + imageTop}
              left={(element.left / 100.0) * imageWidth + imageLeft}
              radius={(element.radius / 100.0) * imageWidth}
              active={idx === searchResult}
            />
          ))}

          {/* __  __            */}
          {/* |  \/  |__ _ _ __  */}
          {/* | |\/| / _` | '_ \ */}
          {/* |_|  |_\__,_| .__/ */}
          {/*             |_|    */}
          <Card.Image
            id="Mapa-UPRM"
            style={{ padding: 0, margin: "1rem" }}
            src="assets/Mapa_UPRM.webp"
            alt="Imagen del mapa de UPR Mayagüez"
            onClick={imageWasClicked}
          />

          {/* ___             _ _     __  __                           */}
          {/* | _ \___ ____  _| | |_  |  \/  |___ ______ __ _ __ _ ___  */}
          {/* |   / -_|_-< || | |  _| | |\/| / -_|_-<_-</ _` / _` / -_) */}
          {/* |_|_\___/__/\_,_|_|\__| |_|  |_\___/__/__/\__,_\__, \___| */}
          {/*                                                |___/      */}
          <Container style={{ margin: "1rem" }}>
            <p className="is-size-3-desktop is-size-5-touch">
              {buildResultMessage(searchResult)}
            </p>
          </Container>

          {/*     ___                   _                  */}
          {/*    |   \ _ _ ___ _ __  __| |_____ __ ___ _   */}
          {/*    | |) | '_/ _ \ '_ \/ _` / _ \ V  V / ' \  */}
          {/*    |___/|_| \___/ .__/\__,_\___/\_/\_/|_||_| */}
          {/*                 |_|                          */}
          <Container
            className="p-3 my-4"
            style={{
              border: "0.5rem double forestgreen",
              borderRadius: "1rem",
              height: "auto",
            }}
          >
            <Button
              fullwidth={true}
              color="success"
              onClick={() => setListExpanded(!listExpanded)}
            >
              {listExpanded ? (
                <FontAwesomeIcon icon={faChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
            </Button>

            <div
              style={{
                overflow: "hidden",
                transition: "max-height 0.75s ease",
                height: "auto",
                maxHeight: listExpanded ? "5000px" : "0px",
                marginTop: listExpanded ? "1rem" : "0",
              }}
            >
              {buildings.slice(1).map((element: BuildingsType, idx: number) => (
                <p
                  key={idx + 1}
                  className="is-size-5 m-1"
                  style={{
                    display: listExpanded ? "block" : "none",
                    cursor: "pointer",
                  }}
                  onClick={(event: React.MouseEvent<HTMLParagraphElement>) => {
                    event.preventDefault();
                    setSearchResult(idx + 1);
                    window.scroll({ top: 0, left: 0, behavior: "smooth" });
                  }}
                >
                  {idx + 1}. {element.title}
                </p>
              ))}
            </div>
          </Container>
        </Card.Content>

        {/*  ___         _            */}
        {/* | __|__  ___| |_ ___ _ _  */}
        {/* | _/ _ \/ _ \  _/ -_) '_| */}
        {/* |_|\___/\___/\__\___|_|   */}

        <Card.Footer className="is-flex is-flex-direction-column is-align-items-flex-start p-5">
          <h4>Enlaces útiles</h4>
          <a className="is-size-5-desktop" href="https://www.uprm.edu/portada/">
            Portada UPRM
          </a>
          <a
            className="is-size-5-desktop"
            href="https://www.uprm.edu/portales/mapa/"
          >
            Mapa oficial UPRM
          </a>
          <a
            className="is-size-5-desktop"
            href="https://goo.gl/maps/wYpcpiT2PWVDox4c7"
          >
            Abrir UPRM en Google Maps
          </a>
        </Card.Footer>
      </Card>
    </Content>
  );
}

export default App;

// Thanks to https://www.kirupa.com/animations/creating_pulsing_circle_animation.htm
// Thanks to https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance
