import React from "react";

import { render, cleanup, fireEvent, waitForElement, prettyDOM, waitForElementToBeRemoved } from "@testing-library/react";

import { getByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText } from "@testing-library/react"

import Application from "components/Application";

import axios from 'axios';

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

  const monday = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
  
  expect((queryByText(monday, "no spots remaining"))).toBeInTheDocument();
})

it("loads data, cancels an interview and increased the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on Archie Cohen's appointment.
  const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
  fireEvent.click(getByAltText(appointment, "Delete"));
  // 4. Check that the confirmation message is shown
  expect(getByText(appointment, /are you sure/i)).toBeInTheDocument();
  // 5. Click the confirm button on the confirmation
  fireEvent.click(getByText(appointment, "Confirm"));
  // 6. Check that the element with the text "Deleting" is displayed.
  expect((getByText(appointment,"Deleting"))).toBeInTheDocument()
  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(()=> getByAltText(appointment, "Add"))
  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const monday = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
  
  expect((queryByText(monday, "2 spots remaining"))).toBeInTheDocument();
});

it("loads data, edits an interview and the spots remaining for Monday remains at 1", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Edit" button on Archie Cohen's appointment.
  const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
  fireEvent.click(getByAltText(appointment, "Edit"));
  // 4. Add Nicholas Meisenheimer to input form
  const input = getByPlaceholderText(appointment, /enter student name/i);
  
  fireEvent.change(input, { target: { value: "Nicholas Meisenheimer" } });
  
  // 5. Click the save button
  fireEvent.click(getByText(appointment, "Save"));
 
  // 6. Check that the element with the text "Saving" is displayed.
  expect((getByText(appointment,"Saving"))).toBeInTheDocument()
  // 7. Wait until the element with the the text Nicholas Meisenheimer is display
  await waitForElement(()=> getByText(appointment, "Nicholas Meisenheimer"))
  // 8. Check that the DayListItem with the text "Monday" still has the text "1 spots remaining".
  const monday = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
  
  expect((queryByText(monday, "1 spot remaining"))).toBeInTheDocument();
});

it("shows the delete error when failing to save an appointment", async () => {
  axios.delete.mockRejectedValueOnce();

  // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on Archie Cohen's appointment.
  const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
  fireEvent.click(getByAltText(appointment, "Delete"));
  // 4. Check that the confirmation message is shown
  expect(getByText(appointment, /are you sure/i)).toBeInTheDocument();
  // 5. Click the confirm button on the confirmation
  fireEvent.click(getByText(appointment, "Confirm"));
  // 6. Check that the element with the text "Deleting" is displayed.
  expect((getByText(appointment,"Deleting"))).toBeInTheDocument()
  // 7. Wait until the error message is displayed and then click close
  await waitForElement(()=> getByText(appointment, /cancel/i))
  fireEvent.click(getByAltText(appointment, "Close"));
  

  // 8. Check that the DayListItem with the text "Monday" still has the text "1 spot remaining".
  const monday = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
  
  expect((queryByText(monday, "1 spot remaining"))).toBeInTheDocument();
});

it("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();

  // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Edit" button on Archie Cohen's appointment.
  const appointment = getAllByTestId(container, "appointment").find(appointment => queryByText(appointment, "Archie Cohen"));
  fireEvent.click(getByAltText(appointment, "Edit"));
  // 4. Add Nicholas Meisenheimer to input form
  const input = getByPlaceholderText(appointment, /enter student name/i);
  
  fireEvent.change(input, { target: { value: "Nicholas Meisenheimer" } });
  
  // 5. Click the save button
  fireEvent.click(getByText(appointment, "Save"));
 
  // 6. Check that the element with the text "Saving" is displayed.
  expect((getByText(appointment,"Saving"))).toBeInTheDocument()
   // 7. Wait until the error message is displayed and then click close, and cancel
   await waitForElement(()=> getByText(appointment, /save/i))
   fireEvent.click(getByAltText(appointment, "Close"));
   fireEvent.click(getByText(appointment, "Cancel"));

  // 8. Check that the DayListItem with the text "Monday" still has the text "1 spots remaining" and that Archie Cohen still has an appointment.
  const monday = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
  
  expect((queryByText(monday, "1 spot remaining"))).toBeInTheDocument();
  expect(getByText(container, "Archie Cohen")).toBeInTheDocument();

});