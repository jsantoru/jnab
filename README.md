# Jnab
An ESPP calculator written in Angular4 with Bootstrap. Uses a node.js backend (https://github.com/jsantoru/jnab-backend) and a 3rd party API (http://docs.intrinio.com/) for stock information lookup.

This application is running at (http://esppcalc.com).

## Features
- Company Lookup with typeahead
- "sticky" navbar on the top (as you scroll navbar stays on top)
- Collapsable input section
- Ability to enter ESPP specific info and your salaray, contribution percent and marginal tax bracket
- Potential Profit and table showing details

## Usage
- Navigate to http://esppcalc.com
- Search for your publicly traded company by starting to type it's name or ticker
- Select it from the typeahead results
- Adjust the ESPP Info and Personal Info for your specific situation
- Click Calculate
- View the Potential Profit Below
- View the Potetnial Profit Table for details

## Notes
Prod Build: ng build --prod --output-path docs --base-href jnab
