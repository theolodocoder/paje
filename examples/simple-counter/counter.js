import { createPaje } from "../../packages/runtime/dist/paje.js";
import { h } from "../../packages/runtime/dist/paje.js";
import { hString } from "../../packages/runtime/src/h.js";

createPaje(
  { count: 0 },
  (state, emit) =>
    h(
      "div",
      {
        style: {
          textAlign: "center",
          margin: "0",
          paddingTop: "50px",
          width: "100%",
          height: "100vh",
          backgroundColor: "black",
          color: "white",
        },
      },
      [
        h("h1", { style: { fontWeight: "bold" } }, [
          hString("Simple Counter App"),
          h(
            "span",
            {
              style: { fontSize: "12px", color: "yellow", marginLeft: "10px" },
            },
            [hString("- using Paje")]
          ),
        ]),
        h(
          "div",
          {
            style: {
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              marginTop: "20px",
            },
            id: "counter-container",
          },
          [
            h(
              "button",
              { on: { click: () => emit("decrement", state.count) } },
              [hString("-")]
            ),
            h("span", {}, [hString(`Count: ${state.count}`)]),
            h(
              "button",
              { on: { click: () => emit("increment", state.count) } },
              [hString("+")]
            ),
          ]
        ),
      ]
    ),
  {
    increment: (state) => ({ ...state, count: state.count + 1 }),
    decrement: (state) => ({ ...state, count: state.count - 1 }),
  }
).mount(document.body);
