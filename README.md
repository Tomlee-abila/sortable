# Sortable Table

## Overview

The Sortable Table project provides a web-based table with interactive sorting and filtering capabilities. Users can sort table data by clicking on column headers and filter the data by entering search queries. The table supports sorting both alphabetically and numerically, and handles numerical values stored as strings as well as missing values.

## Features

- **Interactive Sorting**: Click on column headers to sort the table by that column. Toggle between ascending and descending order with consecutive clicks.
- **Numerical Sorting**: Columns with string representations of numerical values (e.g., "78 kg") are sorted numerically.
- **Missing Values Handling**: Missing values are always sorted last, regardless of the sort order.
- **Search Filtering**: Filter the table data interactively by typing into a search box. Results update after every keystroke.

## Getting Started

### Prerequisites

- A modern web browser (e.g., Google Chrome, Firefox, Safari)
- Basic knowledge of HTML, CSS, and JavaScript

### Installation

1. **Clone the Repository**

```bash
   git clone https://learn.zone01kisumu.ke/git/viarony/sortable.git
   cd sortable
```
## Open the Project

Open index.html in your preferred web browser to view and interact with the sortable table.

##Usage

1. **Sorting:**

Click on a column header to sort the table by that column in ascending order.
Click again to toggle the sort order to descending.
2. **Filtering:**

Type into the search box at the top of the table to filter the rows by name. The table updates with each keystroke.

## Code Structure
- `index.html:` The main HTML file containing the structure of the table.
- `styles.css:` Contains the styles for the table and search box.
- `script.js`: Contains the JavaScript code for sorting, filtering, and handling data.
## Example

**Contributing**

If you'd like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature-branch).
5. Create a pull request.


