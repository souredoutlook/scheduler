import React from "react";

import { render, cleanup, fireEvent, waitForElement, prettyDOM } from "@testing-library/react";

import { getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react"

import Application from "components/Application";
import { getAppointmentsForDay } from "helpers/selectors";

afterEach(cleanup);

it("defaults to Monday and changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

it("loads data, books an interview and reduces the spots remaining for the first day by 1", async ()=>{
  const { container } = render(<Application />);

  await waitForElement(()=> getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment")[0];
  
  fireEvent.click(getByAltText(appointment, "Add"));

  
  const input = getByPlaceholderText(appointment, /enter student name/i);
  
  fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
  
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"))
  
  fireEvent.click(getByText(appointment, "Save"));
  
  expect((getByText(appointment,"Saving"))).toBeInTheDocument()
  
  await waitForElement(()=>getByText(appointment, "Lydia Miller-Jones"));
  
  expect((queryByText(container, "no spots remaining"))).toBeInTheDocument();
})