# DANS Metadata form application

## Setting up a metadata form

 - Create a project folder in ./src/config/
 - Create a form.ts and a pages.ts file in that folder
 - Create a .production.env (for the build script) and .development.env (for the start script) file based on the .env file in the root directory

#### pages.ts
The pages file should have a default export of an array of page objects.

    const pages = [{
      // unique identifier
      id: "page_id",
      
      // appears in page content in H1 tag. Can be a string, or a language object
      name: {
        en: "Page name",
        nl: "Pagina naam"
      },
    
      // permalink URL
      slug: "page_slug",
      
      // template can be 'generic' or 'deposit'
      template: "generic" ,
      
      // Show this page in the menu bar
      inMenu: true,
      
      // Title of page in menu bar. Can be a string, or a language object
      menuTitle: "Menu title",
      
      // HTML formatted page content. Can be a string, or a language object
      content: "<p>...</p>",
      
      // Optional action button
      action: {
        // slug the button links to
        link: "link_to_slug",
        // button text, can be a string, or a language object
        text: "Button text",
        // only display this button if user is logged in, otherwise show a login button
        restricted: true,
      },
      
      // if true, only logged in users can access this page
      restricted: true,
      
      // Optional page logo. If true, create a 'images' folder in your project dir and add a logo.png file
      logo: true
    }];
    
    export default pages;

#### form.ts
The form file should have a default export of an array of section objects. Each section is a collapsible accordion in the front-end.

    const form = [{
      // unique identifier for this section
      id: "section_id",
    
      // section title, can be a string or a language object ({en: ..., nl: ..., etc})
      title: {
        en: 'English title',
        nl: 'Nederlandse titel'
      },
    
      // Array of input fields for this section
      fields: [
        {
          // Field type. Can be:
          // * autocomplete - this is a selectbox with either a pre-defined list or typeahead service coupled
          // * text - plain textbox
          // * date - date/time selector
          // * number - numbers only
          // * group - a field group, this group contains another fields array
          // * radio - a radio button selection field (one option is always selected)
          // * check - a checkbox selection field (select zero or more options)
          type: 'text',
    
          // Label can be a string or preferably a language object
          label: 'Some string',
    
          // Name for this field, gets sent to the API, needed for mapping
          name: 'some_string',
    
          // Optionally set field to required or not. Not applicable to radio buttons or group fields.
          required: true,
    
          // Optional field description, can be a string or a language object. Appears in tooltip or under label in case of group field
          description: 'Some description',
    
          // Optional pre-set value of this field. A string in case of a text field, an options object in case of an autocomplete field
          value: 'Some value string',
    
          // Optionally set field to private - this data won't be public
          private: true,
    
          // You can set the disabled flag if you don't want the user to change this field's value
          disabled: true,
    
          // Text and group fields only, make field repeatable field
          repeatable: true,
    
          // Text field only, enable this if you want a larger textarea
          multiline: true,
    
          // Textfield only, to validate input. See ValidationType in types/Metadata.ts
          validation: 'email', 
    
          // Textfield only. Optionally provide this value if you want to fill a textfield based on user authentication object. See AuthProperty in types/Metadata.ts for options.
          autofill: 'name',
    
          // Date field only. Specify the format you want to use. See DateTimeFormat in types/Metadata.ts.
          format: 'DD-MM-YYYY HH:mm',
    
          // Date field only. Specify an optional minimum and/or maximum input date.
          minDate: '01-01-2020 12:00',
          maxDate: '01-01-2024 12:00',
    
          // Number field only, specify min and/or max number
          minValue: '10',
          maxValue: '20',
    
          // Autocomplete, radio and check fields only. Selectable options, can be:
          // * an array of option objects like below
          // * an API service: 'orcid', 'ror', 'narcis', etc (autocomplete only). See TypeaheadAPI in types/Metadata.ts.
          // * an array of API services ['orcid', 'ror'] (autocomplete only)
          options: [
            // This is an options object
            { 
              // Can be a string or language object
              label: 'Some label',
              // Value is a string, gets sent to server
              value: 'some_string',
              // Optionally set this to true, to always have this value selected. Autocomplete only.
              mandatory: true,
            }
          ],
          
          // In case Google Sheets is selected as API, you must provide a sheetOptions object
          sheetOptions: {
            // ID of the Google sheet, a long string
            sheetId: 'IDXXX',
            // Name of the page/spread inside the Google sheet you wish to retrieve
            page: 'Page 1',
            // Start displaying data from this row onwards, counting starts at 0
            startAtRow: 1,
            // The column number that contains the display label, starting at 0
            labelCol: 0, 
            // The column that contains the value, starting at 0
            valueCol: 1,
            // Optionally, in case you have a list that contain values that need to be grouped with a header in the dropdown,
            // the column that contains the header name
            headerCol: 2,
          },
    
          // Autocompletefield only. In case an array of typeahead services is provided, pick the default service (required)
          multiApiValue: "orcid",
    
          // Autocompletefield only. Make multiple selections possible.
          multiselect: true,
    
          // Autocompletefield only. Allow user to enter a value not in dropdown/API.
          allowFreeText: true,
    
          // Group field only. An array of inputfields (text, autocomplete, etc, as above).
          fields: [{...}],
        },
      ]
    }];
    
    export default form;

## Available Scripts
In the project directory, you can run:

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.