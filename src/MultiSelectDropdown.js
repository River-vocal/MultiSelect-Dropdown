import React, { useState } from "react";
import { components } from "react-select";
import makeAnimated from "react-select/animated";
import "./style.css";
import MySelect from "./MySelect";
import { groups } from "./myData";
import CreateGroup from "./CreateGroup";



const Option = props => {
	return (
	  <div>
		 <components.Option {...props}>
			<input
			  type="checkbox"
			  checked={props.isSelected}
			  onChange={() => null}
			/>{" "}
			<label>{props.label}</label>
		 </components.Option>
	  </div>
	);
 };
 
 export const allOption = {
	label: "Select all",
	value: "*"
 };
 
 const ValueContainer = ({ children, ...props }) => {
	const currentValues = props.getValue();
	let toBeRendered = children;
	if (currentValues.some(val => val.value === allOption.value)) {
	  toBeRendered = [[children[0][0]], children[1]];
	}
 
	return (
	  <components.ValueContainer {...props}>
		 {toBeRendered}
	  </components.ValueContainer>
	);
 };
 
 const MultiValue = props => {
	let labelToBeDisplayed = `${props.data.label} `;
	if (props.data.value === allOption.value) {
		labelToBeDisplayed = "All is selected";
	}
	return (
	  <components.MultiValue {...props}>
		 <span>{labelToBeDisplayed}</span>
	  </components.MultiValue>
	);
 };


export default function Groupingtry() {
	const animatedComponents = makeAnimated();
	const [value, setValue] = useState([]);
	let options = [];
	let numOfOptions = 0;
	groups.map(function (group) {
		return numOfOptions += group.options.length;
	})
	groups.map(function (group, i) {
		return options.push(CreateGroup(group.label + " (Click here to select all)", group.options, setValue, i, value, numOfOptions));
	})
	

	return (
		<div className="App">
			<h1>Tasks</h1>
			<p>Select which assets will be worked on and what tasks will be performed for each asset.</p>
			<span 
        className="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Search Asset(s)"
      >
			<MySelect 
				onChange={function (selected) {
					return setValue(selected);
				}}
				closeMenuOnSelect={false}
				isMulti
				options={options}
				value={value}
				allowSelectAll={true}
				hideSelectedOptions={false}
				placeholder="Search Assets"
				components={{
					Option,
					MultiValue,
					ValueContainer,
					animatedComponents
				 }}
				 totOptions = { numOfOptions }
			/>
			</span>
		</div>
	);
}
