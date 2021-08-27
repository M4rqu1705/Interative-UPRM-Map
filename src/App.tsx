import React, { useState } from "react";
import { Card, Content, Container, Form } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "bulma/css/bulma.min.css";
import "./styles/App.css";

function App(): any {
  const buildings = [
    {
      name: "Taller de Arte en Remodelación",
      left: 44.16,
      top: 44.74,
      width: 1.96,
      height: 3.17,
      keywords: [],
    },
    {
      name: "Administración de Empresas",
      left: 17.77,
      top: 15.91,
      width: 9.0,
      height: 14.11,
      keywords: ["ae"],
    },
    {
      name: "Almacén del CID",
      left: 83.62,
      top: 28.23,
      width: 1.48,
      height: 3.08,
      keywords: [],
    },
    {
      name: "Almacén Obras de MuSA",
      left: 60.68,
      top: 80.75,
      width: 1.77,
      height: 2.99,
      keywords: [],
    },
    {
      name: "Antiguo Centro Nuclear (varios programas incluyendo Sea Grant)",
      left: 76.92,
      top: 26.18,
      width: 4.98,
      height: 4.7,
      keywords: ["sea grant"],
    },
    {
      name: "Antigua Pista Atlética",
      left: 76.85,
      top: 80.58,
      width: 17.29,
      height: 13.17,
      keywords: [],
    },
    {
      name: "Banda y Orquesta",
      left: 75.1,
      top: 78.36,
      width: 7.61,
      height: 13.86,
      keywords: [],
    },
    {
      name: "Biblioteca General",
      left: 53.54,
      top: 57.57,
      width: 7.42,
      height: 10.27,
      keywords: [],
    },
    {
      name: "Biología",
      left: 61.11,
      top: 24.04,
      width: 8.96,
      height: 8.3,
      keywords: ["b"],
    },
    {
      name: "Centro de Cuido Diurno",
      left: 6.47,
      top: 39.95,
      width: 3.59,
      height: 4.88,
      keywords: [],
    },
    {
      name: "Centro de Estudiantes",
      left: 63.36,
      top: 60.14,
      width: 5.65,
      height: 8.21,
      keywords: [],
    },
    {
      name: "Central Telefónica",
      left: 44.35,
      top: 51.67,
      width: 1.87,
      height: 4.02,
      keywords: [],
    },
    {
      name: "CISA",
      left: 78.74,
      top: 21.56,
      width: 1.87,
      height: 2.74,
      keywords: [],
    },
    {
      name: "Coliseo Rafael A. Mangual",
      left: 30.84,
      top: 56.37,
      width: 8.57,
      height: 12.66,
      keywords: ["cm"],
    },
    {
      name: "Complejo de Tennis 2010",
      left: 10.3,
      top: 40.38,
      width: 10.82,
      height: 10.69,
      keywords: [],
    },
    {
      name: "Cuarto Limpio (CID)",
      left: 84.0,
      top: 31.31,
      width: 1.34,
      height: 2.22,
      keywords: [],
    },
    {
      name: "Natatorio 2010",
      left: 13.94,
      top: 29.6,
      width: 13.03,
      height: 10.78,
      keywords: [],
    },
    {
      name: "Decanato de Estudiantes (Asistencia Económica / Calidad de Vida / Dept. de Consejería y Servicios Psicológicos)",
      left: 74.47,
      top: 75.88,
      width: 3.07,
      height: 4.7,
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
      width: 8.24,
      height: 17.71,
      keywords: [],
    },
    {
      name: "Sánchez Hidalgo (DECEP / PpMES / Economía)",
      left: 59.15,
      top: 45.94,
      width: 6.7,
      height: 3.85,
      keywords: ["sh", "decep"],
    },
    {
      name: "Edificio A (Dormitorio de Atletas)",
      left: 6.85,
      top: 30.28,
      width: 1.96,
      height: 3.17,
      keywords: ["dormitorio atletas"],
    },
    {
      name: "Edificio B (Adm. Pequeños Negocios / Ofic. Adm.)",
      left: 10.15,
      top: 29.43,
      width: 3.21,
      height: 4.36,
      keywords: [],
    },
    {
      name: "Edificio C (Oficina de Extensión Agrícola)",
      left: 4.93,
      top: 34.05,
      width: 3.07,
      height: 5.05,
      keywords: [],
    },
    {
      name: "Edificio D",
      left: 8.38,
      top: 32.25,
      width: 2.49,
      height: 4.36,
      keywords: [],
    },
    {
      name: "Chardón (Estudios Generales)",
      left: 68.15,
      top: 53.55,
      width: 3.64,
      height: 9.24,
      keywords: ["ch"],
    },
    {
      name: "Jesús T. Piñero (Ciencias Agrícolas)",
      left: 48.61,
      top: 76.9,
      width: 7.61,
      height: 12.49,
      keywords: ["p"],
    },
    {
      name: "José de Diego",
      left: 68.68,
      top: 73.91,
      width: 5.03,
      height: 5.05,
      keywords: [],
    },
    {
      name: "Luis de Celis (Admisiones - Celis 101 / Registro / Decanato de Artes y Ciencias / Estudios Graduados)",
      left: 69.44,
      top: 66.81,
      width: 6.32,
      height: 7.27,
      keywords: ["c"],
    },
    {
      name: "Luis Monzón",
      left: 62.84,
      top: 70.92,
      width: 5.41,
      height: 6.76,
      keywords: ["m"],
    },
    {
      name: "Luis Stefani",
      left: 74.14,
      top: 53.46,
      width: 5.6,
      height: 10.09,
      keywords: ["s"],
    },
    {
      name: "Oficinas de Facultad",
      left: 54.45,
      top: 49.87,
      width: 6.85,
      height: 3.68,
      keywords: [],
    },
    {
      name: "Ramírez de Arellano y Rossell",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "Josefina Torres Torres (Enfermería)",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: ["ee"],
    },
    {
      name: "Canchas Racquetball 2010",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "Terrats (Finanzas y Pagaduría)",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: ["t"],
    },
    {
      name: "Finca Alzamora",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: ["az"],
    },
    {
      name: "Física, Geología y Ciencias Marinas",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: ["f"],
    },
    {
      name: "Gimnasio Ángel F. Espada",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: ["ge"],
    },
    {
      name: "Ofic. en Remodelación Guardia Universitaria",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "Imprenta y Artes Plásticas",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "Ingeniería Civil",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: ["ci"],
    },
    {
      name: "Ingeniería Industrial",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: ["ii"],
    },
    {
      name: "Antonio Luchetti (Ingeniería Mecánica)",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: ["l"],
    },
    {
      name: "Ingeniería Química",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: ["iq"],
    },
    {
      name: "Museo de Vehículos Solares",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "Laboratorio Ingeniería Agrícola",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "Laboratorio de Vehículos Solares",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "Centro Interdisciplinario de Estudios del Litoral",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "MuSA (Museo y Senado Académico)",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "Nueva Pista Atlética",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "CID (Oficina Administrativa)",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "Ofic. Campus Verde (Casa Solar 2005)",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "Programa Rehabilitación Vocacional",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "OMCA",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "Química",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: ["q"],
    },
    {
      name: "Red Sísmica",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "Residencia del Rector",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "R.O.T.C.",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "Sendero de los ejercicios",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "Servicios Médicos y Sala de Emergencia",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "Taller de Artes Gráficas",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "Instalaciones Temporeras Guardia Universitaria",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
    {
      name: "Salón Mezzanine",
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      keywords: [],
    },
  ];

  const defaultMessage = "Se recomeinda utilizar horizontalmente.";

  const [searchResult, setSearchResult] = useState(defaultMessage);
  const imageWasClicked = (event: any) => {
    event.preventDefault();

    const bounds = event.target.getBoundingClientRect();
    const imageTop = bounds.top;
    const imageLeft = bounds.left;
    const imageWidth = bounds.width;
    const imageHeight = bounds.height;
    const clickTop = event.clientY;
    const clickLeft = event.clientX;
    const pctTop = ((clickTop - imageTop) / imageHeight) * 100.0;
    const pctLeft = ((clickLeft - imageLeft) / imageWidth) * 100.0;

    buildings.forEach((element) => {
      const insideBoundingBox = [
        element.top <= pctTop,
        pctTop <= element.top + element.height,
        element.left <= pctLeft,
        pctLeft <= element.left + element.width,
      ];

      if (insideBoundingBox.every((val) => val)) {
        setSearchResult(element.name);
      }
    });
  };
  const seachQueryChanged = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;

    if (query.length == 0) {
      setSearchResult(defaultMessage);
      return;
    }

    let closestElement = buildings[0];
    let closestScore = Number.MIN_VALUE;

    buildings.forEach((element) => {
      if (element.keywords.includes(query.toLowerCase())) {
        closestElement = element;
        closestScore = Number.MAX_VALUE;
      }
    });

    buildings.forEach((element) => {
      let queue = query
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .split("");
      let score = 0;

      for (let i = 0; i < element.name.length && queue.length > 0; i++) {
        const char = element.name[i]
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        if (char === queue[0]) {
          queue = queue.slice(1);
          score++;
        }
      }

      if (score > closestScore) {
        closestElement = element;
        closestScore = score;
      }
    });

    setSearchResult(closestElement.name);
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
          <Container style={{ margin: "1rem" }}></Container>

          <Card.Image
            style={{ padding: 0, margin: "0" }}
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
