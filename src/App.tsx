import React, { useState } from "react";
import { Card, Content, Container, Form } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "bulma/css/bulma.min.css";
import "./styles/App.css";
import Bubble from "./components/Bubble";

function App(): any {
  const buildings: Array<BuildingsType> = [
    {
      name: "Taller de Arte en Remodelación",
      left: 45.21,
      top: 46.19,
      radius: 2,
      keywords: ["1"],
    },
    {
      name: "Administración de Empresas",
      left: 24.71,
      top: 20.7,
      radius: 2,
      keywords: ["2", "ae"],
    },
    {
      name: "Almacén del CID",
      left: 84.2,
      top: 29.6,
      radius: 2,
      keywords: ["3"],
    },
    {
      name: "Almacén Obras de MuSA",
      left: 61.25,
      top: 82.72,
      radius: 2,
      keywords: ["4"],
    },
    {
      name: "Antiguo Centro Nuclear (varios programas incluyendo Sea Grant)",
      left: 79.21,
      top: 28.23,
      radius: 2,
      keywords: ["5"],
    },
    {
      name: "Antigua Pista Atlética",
      left: 86.83,
      top: 87.0,
      radius: 2,
      keywords: ["6"],
    },
    {
      name: "Banda y Orquesta",
      left: 81.9,
      top: 79.73,
      radius: 2,
      keywords: ["7"],
    },
    {
      name: "Biblioteca General",
      left: 57.57,
      top: 62.28,
      radius: 2,
      keywords: ["8"],
    },
    {
      name: "Edificio de Biología",
      left: 65.18,
      top: 28.23,
      radius: 2,
      keywords: ["9", "b"],
    },
    {
      name: "Centro de Cuido Diurno",
      left: 8.81,
      top: 42.09,
      radius: 2,
      keywords: ["10"],
    },
    {
      name: "Centro de Estudiantes",
      left: 66.04,
      top: 64.33,
      radius: 2,
      keywords: ["11"],
    },
    {
      name: "Central Telefónica",
      left: 45.26,
      top: 53.29,
      radius: 2,
      keywords: ["12"],
    },
    {
      name: "CISA",
      left: 79.98,
      top: 23.27,
      radius: 2,
      keywords: ["13"],
    },
    {
      name: "Coliseo Rafael A. Mangual",
      left: 35.44,
      top: 62.87,
      radius: 2,
      keywords: ["14", "cm"],
    },
    {
      name: "Complejo de Tennis 2010",
      left: 12.21,
      top: 43.63,
      radius: 2,
      keywords: ["15"],
    },
    {
      name: "Cuarto Limpio (CID)",
      left: 85.3,
      top: 32.93,
      radius: 2,
      keywords: ["16"],
    },
    {
      name: "Natatorio 2010",
      left: 18.92,
      top: 37.64,
      radius: 2,
      keywords: ["17"],
    },
    {
      name: "Decanato de Estudiantes (Asistencia Económica / Calidad de Vida / Dept. de Consejería y Servicios Psicológicos)",
      left: 75.96,
      top: 78.44,
      radius: 2,
      keywords: [
        "18",
        "asistencia economica",
        "calidad de vida",
        "consejeria y servicios psicologicos",
      ],
    },
    {
      name: "Departamento de Edificios y Terrenos",
      left: 35.68,
      top: 35.67,
      radius: 2,
      keywords: ["19"],
    },
    {
      name: "Edificio Sánchez Hidalgo (DECEP / PpMES / Economía)",
      left: 62.31,
      top: 47.65,
      radius: 2,
      keywords: ["20", "sh", "decep"],
    },
    {
      name: "Edificio A (Dormitorio de Atletas)",
      left: 7.95,
      top: 32.34,
      radius: 2,
      keywords: ["21", "dormitorio atletas"],
    },
    {
      name: "Edificio B (Adm. Pequeños Negocios / Ofic. Adm.)",
      left: 11.78,
      top: 32.16,
      radius: 2,
      keywords: ["22"],
    },
    {
      name: "Edificio C (Oficina de Extensión Agrícola)",
      left: 6.47,
      top: 36.18,
      radius: 2,
      keywords: ["23"],
    },
    {
      name: "Edificio D",
      left: 9.43,
      top: 34.13,
      radius: 2,
      keywords: ["24"],
    },
    {
      name: "Edificio Chardón (Estudios Generales)",
      left: 72.7,
      top: 61.51,
      radius: 2,
      keywords: ["25", "ch"],
    },
    {
      name: "Edificio Jesús T. Piñero (Ciencias Agrícolas)",
      left: 51.72,
      top: 82.89,
      radius: 2,
      keywords: ["26", "p"],
    },
    {
      name: "Edificio José de Diego",
      left: 70.83,
      top: 75.79,
      radius: 2,
      keywords: ["27"],
    },
    {
      name: "Edificio Luis de Celis (Admisiones - Celis 101 / Registro / Decanato de Artes y Ciencias / Estudios Graduados)",
      left: 73.47,
      top: 67.49,
      radius: 2,
      keywords: ["28", "c"],
    },
    {
      name: "Edificio Luis Monzón",
      left: 66.14,
      top: 74.76,
      radius: 2,
      keywords: ["29", "m"],
    },
    {
      name: "Edificio Luis Stefani",
      left: 78.35,
      top: 60.14,
      radius: 2,
      keywords: ["30", "s"],
    },
    {
      name: "Edificio Oficinas de Facultad",
      left: 57.81,
      top: 51.07,
      radius: 2,
      keywords: ["31"],
    },
    {
      name: "Edificio Ramírez de Arellano y Rossell",
      left: 3.98,
      top: 45.25,
      radius: 2,
      keywords: ["32"],
    },
    {
      name: "Edificio Josefina Torres Torres (Enfermería)",
      left: 49.09,
      top: 53.21,
      radius: 2,
      keywords: ["33", "ee"],
    },
    {
      name: "Canchas Racquetball 2010",
      left: 14.56,
      top: 28.06,
      radius: 2,
      keywords: ["34"],
    },
    {
      name: "Edificio Terrats (Finanzas y Pagaduría)",
      left: 75.91,
      top: 50.81,
      radius: 2,
      keywords: ["35", "t"],
    },
    {
      name: "Finca Alzamora",
      left: 1.25,
      top: 37.3,
      radius: 2,
      keywords: ["36", "az"],
    },
    {
      name: "Física, Geología y Ciencias Marinas",
      left: 72.84,
      top: 44.57,
      radius: 2,
      keywords: ["37", "f"],
    },
    {
      name: "Gimnasio Ángel F. Espada",
      left: 44.59,
      top: 65.53,
      radius: 2,
      keywords: ["38", "ge"],
    },
    {
      name: "Ofic. en Remodelación Guardia Universitaria",
      left: 75,
      top: 49.1,
      radius: 2,
      keywords: ["39"],
    },
    {
      name: "Imprenta y Artes Plásticas",
      left: 14.99,
      top: 20.27,
      radius: 2,
      keywords: ["40"],
    },
    {
      name: "Edificio Ingeniería Civil",
      left: 51.82,
      top: 19.93,
      radius: 2,
      keywords: ["41", "ci"],
    },
    {
      name: "Edificio Ingeniería Industrial",
      left: 72.32,
      top: 51.67,
      radius: 2,
      keywords: ["42", "ii"],
    },
    {
      name: "Edificio Antonio Luchetti (Ingeniería Mecánica)",
      left: 82.04,
      top: 70.66,
      radius: 2,
      keywords: ["43", "l"],
    },
    {
      name: "Edificio Ingeniería Química",
      left: 47.27,
      top: 26.69,
      radius: 2,
      keywords: ["44", "iq"],
    },
    {
      name: "Museo de Vehículos Solares",
      left: 76.87,
      top: 24.21,
      radius: 2,
      keywords: ["45"],
    },
    {
      name: "Laboratorio Ingeniería Agrícola",
      left: 41.71,
      top: 40.72,
      radius: 2,
      keywords: ["46"],
    },
    {
      name: "Laboratorio de Vehículos Solares",
      left: 78.07,
      top: 20.62,
      radius: 2,
      keywords: ["47"],
    },
    {
      name: "Centro Interdisciplinario de Estudios del Litoral",
      left: 72.56,
      top: 24.47,
      radius: 2,
      keywords: ["48"],
    },
    {
      name: "MuSA (Museo y Senado Académico)",
      left: 59.1,
      top: 77.07,
      radius: 2,
      keywords: ["49"],
    },
    {
      name: "Nueva Pista Atlética",
      left: 29.12,
      top: 49.44,
      radius: 2,
      keywords: ["50"],
    },
    {
      name: "CID (Oficina Administrativa)",
      left: 81.03,
      top: 35.41,
      radius: 2,
      keywords: ["51"],
    },
    {
      name: "Ofic. Campus Verde (Casa Solar 2005)",
      left: 75.19,
      top: 29.43,
      radius: 2,
      keywords: ["52"],
    },
    {
      name: "Programa Rehabilitación Vocacional",
      left: 61.54,
      top: 40.21,
      radius: 2,
      keywords: ["53"],
    },
    {
      name: "OMCA",
      left: 64.8,
      top: 42.43,
      radius: 2,
      keywords: ["54"],
    },
    {
      name: "Edificio de Química",
      left: 53.54,
      top: 44.05,
      radius: 2,
      keywords: ["55", "q"],
    },
    {
      name: "Red Sísmica",
      left: 67.0,
      top: 41.83,
      radius: 2,
      keywords: ["56"],
    },
    {
      name: "Residencia del Rector",
      left: 64.03,
      top: 83.83,
      radius: 2,
      keywords: ["57"],
    },
    {
      name: "R.O.T.C.",
      left: 80.51,
      top: 64.33,
      radius: 2,
      keywords: ["58"],
    },
    {
      name: "Sendero de los ejercicios",
      left: 25.0,
      top: 78.61,
      radius: 2,
      keywords: ["59"],
    },
    {
      name: "Servicios Médicos y Sala de Emergencia",
      left: 59.15,
      top: 70.49,
      radius: 2,
      keywords: ["60"],
    },
    {
      name: "Taller de Artes Gráficas",
      left: 46.7,
      top: 43.63,
      radius: 2,
      keywords: ["61"],
    },
    {
      name: "Instalaciones Temporeras Guardia Universitaria",
      left: 44.25,
      top: 48.5,
      radius: 2,
      keywords: ["62"],
    },
    {
      name: "Salón Mezzanine",
      left: 8.96,
      top: 46.96,
      radius: 2,
      keywords: ["63"],
    },
  ];

  const defaultMessage =
    "Use la barra de búsqueda o haga click al lugar que quiera identificar.";
  const defaultErrorMessage = "No se encontró ningún edificio con ese nombre.";

  const [searchResult, setSearchResult] = useState(defaultMessage);

  let imageBoundingRect = document
    ?.getElementById("Mapa-UPRM")
    ?.getBoundingClientRect();
  const [imageTop, setImageTop] = useState(imageBoundingRect?.top || 0);
  const [imageLeft, setImageLeft] = useState(imageBoundingRect?.left || 0);
  const [imageWidth, setImageWidth] = useState(imageBoundingRect?.width || 0);
  const [imageHeight, setImageHeight] = useState(
    imageBoundingRect?.height || 0
  );

  const updateImageProportions = () => {
    imageBoundingRect = document
      ?.getElementById("Mapa-UPRM")
      ?.getBoundingClientRect();

    setImageTop(imageBoundingRect?.top || 0);
    setImageLeft(imageBoundingRect?.left || 0);
    setImageWidth(imageBoundingRect?.width || 0);
    setImageHeight(imageBoundingRect?.height || 0);
  };

  window.addEventListener("load", updateImageProportions);
  window.addEventListener("zoom", updateImageProportions);
  window.addEventListener("orientationchange", updateImageProportions);
  window.addEventListener("scroll", updateImageProportions);

  const imageWasClicked = (event: any) => {
    event.preventDefault();

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
  };

  const searchQueryChanged = (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const query = event.currentTarget.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (query.length == 0) {
      setSearchResult(defaultMessage);
      return;
    }

    let foundKeyword = false;
    buildings.forEach((element, idx) => {
      if (element.keywords.includes(query)) {
        foundKeyword = true;
        setSearchResult(`(${idx + 1}) ${element.name}`);
        return;
      }
    });
    if (foundKeyword) return;

    let closestElement = "";
    let closestScore = 0;

    buildings.forEach((element, idx) => {
      let queue = query.split("");
      const elementName = element.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
      let score = 0;

      for (let i = 0; i < elementName.length && queue.length > 0; i++) {
        const char = elementName[i];

        if (char === queue[0]) {
          queue = queue.slice(1);
          score++;
        }
      }

      if (score > closestScore) {
        closestElement = `(${idx + 1}) ${element.name}`;
        closestScore = score;
      }
    });

    if (closestScore !== 0) setSearchResult(closestElement);
    else setSearchResult(defaultErrorMessage);
  };

  return (
    <Content className="is-flex is-flex-direction-column is-align-items-center">
      <h1 className="mt-4 mx-2">Mapa Interactivo UPRM</h1>
      <Card className="p-4 mx-a" style={{ width: "100vw", maxWidth: "1000px" }}>
        <form>
          <Form.Field>
            <Form.Label>Búsqueda</Form.Label>
            <Form.Control className="has-icons-left">
              <Form.Input
                type="search"
                placeholder="Stefani"
                onChange={searchQueryChanged}
                onKeyDown={(event: any) => {
                  if (event.keyCode === 13) {
                    event.preventDefault();
                    event.currentTarget.blur();
                  }
                }}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon={faSearch} />
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
            src="assets/Mapa_UPRM.png"
            alt="Imagen del mapa de UPR Mayagüez"
            onClick={imageWasClicked}
          />

          <Container style={{ margin: "1rem" }}>
            <p>{searchResult}</p>
          </Container>
        </Card.Content>
      </Card>
    </Content>
  );
}

export default App;
