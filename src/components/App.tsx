import React, { useState, ReactElement } from "react";
import { Card, Content, Container, Form } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Bubble from "./Bubble";
import buildings from "../data/buildings.json";

function App(): ReactElement {
  const defaultMessage =
    "Use la barra de búsqueda o haga click al lugar que quiera identificar.";
  const defaultErrorMessage = "No se encontró ningún edificio con ese nombre.";

  // Helper function to put everything in lower-case and remove accents
  function standardize(str: string) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  const [searchResult, setSearchResult] = useState(defaultMessage);

  let imageBoundingRect: DOMRect | undefined;
  const [imageTop, setImageTop] = useState(0);
  const [imageLeft, setImageLeft] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  function updateImageProportions() {
    imageBoundingRect = document
      ?.getElementById("Mapa-UPRM")
      ?.getBoundingClientRect();

    setImageTop(imageBoundingRect?.top || 0);
    setImageLeft(imageBoundingRect?.left || 0);
    setImageWidth(imageBoundingRect?.width || 0);
    setImageHeight(imageBoundingRect?.height || 0);
  }
  // updateImageProportions();

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
      if (
        Math.pow(element.top - ((clickTop - imageTop) / imageHeight) * 100, 2) +
          Math.pow(
            element.left - ((clickLeft - imageLeft) / imageWidth) * 100,
            2
          ) <=
        Math.pow(element.radius, 2)
      ) {
        if (element.name.endsWith(searchResult)) {
          setSearchResult(defaultMessage);
        } else {
          setSearchResult(`(${idx + 1}) ${element.name}`);
        }
      }
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

    if (query.length == 0) {
      setSearchResult(defaultMessage);
      return;
    }

    // First make the most to match keywords
    let foundKeyword = false;
    buildings.forEach((element, idx) => {
      if (element.keywords.includes(query)) {
        foundKeyword = true;
        setSearchResult(`(${idx + 1}) ${element.name}`);
        return;
      }
    });
    if (foundKeyword) return;

    // Otherwise find match with the smallest Damerau Leveshtein Distance
    let closestElement = "(0) ";
    let closestScore = Number.MAX_SAFE_INTEGER;

    buildings.forEach((element, idx) => {
      let elementName = standardize(element.name);
      let score = 0;

      if (elementName.includes("(") && elementName.split("(")[1].length > 10)
        elementName = elementName.split("(")[0].trim();
      score =
        DamerauLeveshteinDistance(query, elementName) / elementName.length;

      if (score < closestScore) {
        closestElement = `(${idx + 1}) ${element.name}`;
        closestScore = score;
      }
    });

    if (closestElement.trim().length !== 0) setSearchResult(closestElement);
    else setSearchResult(defaultErrorMessage);
  }

  return (
    <Content>
      <h1 className="my-5 is-size-1-desktop is-size-3-touch has-text-white has-text-centered">
        Mapa Interactivo UPRM
      </h1>
      <Card
        className="py-4 px-5 mx-a"
        style={{ width: "100vw", maxWidth: "1000px" }}
      >
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
              name={element.name}
              keywords={element.keywords}
              top={(element.top / 100.0) * imageHeight + imageTop}
              left={(element.left / 100.0) * imageWidth + imageLeft}
              radius={(element.radius / 100.0) * imageWidth}
              active={searchResult.endsWith(element.name)}
            />
          ))}

          <Card.Image
            id="Mapa-UPRM"
            style={{ padding: 0, margin: "1rem" }}
            src="assets/Mapa_UPRM.webp"
            alt="Imagen del mapa de UPR Mayagüez"
            onClick={imageWasClicked}
          />

          <Container style={{ margin: "1rem" }}>
            <p className="is-size-3-desktop is-size-5-touch">{searchResult}</p>
          </Container>
        </Card.Content>

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
        </Card.Footer>
      </Card>
    </Content>
  );
}

export default App;

// Thanks to https://www.kirupa.com/animations/creating_pulsing_circle_animation.htm
// Thanks to https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance
