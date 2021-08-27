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
      keywords: [],
    },
    {
      name: "Administración de Empresas",
      left: 17.77,
      top: 15.91,
      radius: 2,
      keywords: ["ae"],
    },
    {
      name: "Almacén del CID",
      left: 83.62,
      top: 28.23,
      radius: 2,
      keywords: [],
    },
    {
      name: "Almacén Obras de MuSA",
      left: 60.68,
      top: 80.75,
      radius: 2,
      keywords: [],
    },
    {
      name: "Antiguo Centro Nuclear (varios programas incluyendo Sea Grant)",
      left: 76.92,
      top: 26.18,
      radius: 2,
      keywords: ["sea grant"],
    },
    {
      name: "Antigua Pista Atlética",
      left: 76.85,
      top: 80.58,
      radius: 2,
      keywords: [],
    },
    {
      name: "Banda y Orquesta",
      left: 75.1,
      top: 78.36,
      radius: 2,
      keywords: [],
    },
    {
      name: "Biblioteca General",
      left: 53.54,
      top: 57.57,
      radius: 2,
      keywords: [],
    },
    {
      name: "Biología",
      left: 61.11,
      top: 24.04,
      radius: 2,
      keywords: ["b"],
    },
    {
      name: "Centro de Cuido Diurno",
      left: 6.47,
      top: 39.95,
      radius: 2,
      keywords: [],
    },
    {
      name: "Centro de Estudiantes",
      left: 63.36,
      top: 60.14,
      radius: 2,
      keywords: [],
    },
    {
      name: "Central Telefónica",
      left: 44.35,
      top: 51.67,
      radius: 2,
      keywords: [],
    },
    {
      name: "CISA",
      left: 78.74,
      top: 21.56,
      radius: 2,
      keywords: [],
    },
    {
      name: "Coliseo Rafael A. Mangual",
      left: 30.84,
      top: 56.37,
      radius: 2,
      keywords: ["cm"],
    },
    {
      name: "Complejo de Tennis 2010",
      left: 10.3,
      top: 40.38,
      radius: 2,
      keywords: [],
    },
    {
      name: "Cuarto Limpio (CID)",
      left: 84.0,
      top: 31.31,
      radius: 2,
      keywords: [],
    },
    {
      name: "Natatorio 2010",
      left: 13.94,
      top: 29.6,
      radius: 2,
      keywords: [],
    },
    {
      name: "Decanato de Estudiantes (Asistencia Económica / Calidad de Vida / Dept. de Consejería y Servicios Psicológicos)",
      left: 74.47,
      top: 75.88,
      radius: 2,
      keywords: [
        "asistencia economica",
        "calidad de vida",
        "consejeria y servicios psicologicos",
      ],
    },
    {
      name: "Departamento de Edificios y Terrenos",
      left: 31.61,
      top: 26.18,
      radius: 2,
      keywords: [],
    },
    {
      name: "Sánchez Hidalgo (DECEP / PpMES / Economía)",
      left: 59.15,
      top: 45.94,
      radius: 2,
      keywords: ["sh", "decep"],
    },
    {
      name: "Edificio A (Dormitorio de Atletas)",
      left: 6.85,
      top: 30.28,
      radius: 2,
      keywords: ["dormitorio atletas"],
    },
    {
      name: "Edificio B (Adm. Pequeños Negocios / Ofic. Adm.)",
      left: 10.15,
      top: 29.43,
      radius: 2,
      keywords: [],
    },
    {
      name: "Edificio C (Oficina de Extensión Agrícola)",
      left: 4.93,
      top: 34.05,
      radius: 2,
      keywords: [],
    },
    {
      name: "Edificio D",
      left: 8.38,
      top: 32.25,
      radius: 2,
      keywords: [],
    },
    {
      name: "Chardón (Estudios Generales)",
      left: 68.15,
      top: 53.55,
      radius: 2,
      keywords: ["ch"],
    },
    {
      name: "Jesús T. Piñero (Ciencias Agrícolas)",
      left: 48.61,
      top: 76.9,
      radius: 2,
      keywords: ["p"],
    },
    {
      name: "José de Diego",
      left: 68.68,
      top: 73.91,
      radius: 2,
      keywords: [],
    },
    {
      name: "Luis de Celis (Admisiones - Celis 101 / Registro / Decanato de Artes y Ciencias / Estudios Graduados)",
      left: 69.44,
      top: 66.81,
      radius: 2,
      keywords: ["c"],
    },
    {
      name: "Luis Monzón",
      left: 62.84,
      top: 70.92,
      radius: 2,
      keywords: ["m"],
    },
    {
      name: "Luis Stefani",
      left: 78.35,
      top: 60.14,
      radius: 2,
      keywords: ["s"],
    },
    {
      name: "Oficinas de Facultad",
      left: 54.45,
      top: 49.87,
      radius: 2,
      keywords: [],
    },
    {
      name: "Ramírez de Arellano y Rossell",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "Josefina Torres Torres (Enfermería)",
      left: 0,
      top: 0,
      radius: 2,
      keywords: ["ee"],
    },
    {
      name: "Canchas Racquetball 2010",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "Terrats (Finanzas y Pagaduría)",
      left: 0,
      top: 0,
      radius: 2,
      keywords: ["t"],
    },
    {
      name: "Finca Alzamora",
      left: 0,
      top: 0,
      radius: 2,
      keywords: ["az"],
    },
    {
      name: "Física, Geología y Ciencias Marinas",
      left: 0,
      top: 0,
      radius: 2,
      keywords: ["f"],
    },
    {
      name: "Gimnasio Ángel F. Espada",
      left: 0,
      top: 0,
      radius: 2,
      keywords: ["ge"],
    },
    {
      name: "Ofic. en Remodelación Guardia Universitaria",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "Imprenta y Artes Plásticas",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "Ingeniería Civil",
      left: 0,
      top: 0,
      radius: 2,
      keywords: ["ci"],
    },
    {
      name: "Ingeniería Industrial",
      left: 0,
      top: 0,
      radius: 2,
      keywords: ["ii"],
    },
    {
      name: "Antonio Luchetti (Ingeniería Mecánica)",
      left: 0,
      top: 0,
      radius: 2,
      keywords: ["l"],
    },
    {
      name: "Ingeniería Química",
      left: 0,
      top: 0,
      radius: 2,
      keywords: ["iq"],
    },
    {
      name: "Museo de Vehículos Solares",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "Laboratorio Ingeniería Agrícola",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "Laboratorio de Vehículos Solares",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "Centro Interdisciplinario de Estudios del Litoral",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "MuSA (Museo y Senado Académico)",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "Nueva Pista Atlética",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "CID (Oficina Administrativa)",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "Ofic. Campus Verde (Casa Solar 2005)",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "Programa Rehabilitación Vocacional",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "OMCA",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "Química",
      left: 0,
      top: 0,
      radius: 2,
      keywords: ["q"],
    },
    {
      name: "Red Sísmica",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "Residencia del Rector",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "R.O.T.C.",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "Sendero de los ejercicios",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "Servicios Médicos y Sala de Emergencia",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "Taller de Artes Gráficas",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "Instalaciones Temporeras Guardia Universitaria",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
    {
      name: "Salón Mezzanine",
      left: 0,
      top: 0,
      radius: 2,
      keywords: [],
    },
  ];

  const defaultMessage =
    "Use la barra de búsqueda o haga click al lugar que quiera identificar.";

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

  const seachQueryChanged = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (query.length == 0) {
      setSearchResult(defaultMessage);
      return;
    }

    let closestElement = "";
    let closestScore = 0;

    buildings.forEach((element, idx) => {
      if (element.keywords.includes(query)) {
        closestElement = `(${idx + 1}) ${element.name}`;
        closestScore = Number.MAX_VALUE;
      }
    });

    if (closestScore === 0)
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

    setSearchResult(closestElement);
  };

  return (
    <Content>
      <h1 className="mt-4 mx-2 has-text-centered">Mapa Interactivo UPRM</h1>
      <Card className="p-4 m-a" style={{ width: "100vw", maxWidth: "1000px" }}>
        <form>
          <Form.Field>
            <Form.Label>Búsqueda</Form.Label>
            <Form.Control className="has-icons-left">
              <Form.Input
                type="search"
                placeholder="Stefani"
                onChange={seachQueryChanged}
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
