# DANS Metadata form application

## Setting up a metadata form

 - Create a project folder in ./src/config/
 - Create a form.ts and a pages.ts file in that folder
 - Edit the .env file in the root directory accordingly

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
        text: "Button text"
      },
      
      // Optional page logo. If true, create a 'images' folder in your project dir and add a logo.png file
      logo: true
    }];
    
    export default pages;

#### form.ts
The form file should have a default export of an array of section objects. Each section is a collapsible accordion in the front-end.

    const form = [{
      // unique identifier for this section
      id: "section_id",
    
      // section title, can be a string or a language object
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
          // * date - date selector
          // * datetime-local - date and time selector
          // * number - numbers only
          // * group - a field group, this group contains another fields array
          type: 'text',
    
          // label can be a string or language object
          label: 'Some string',
    
          // name for this field, gets sent to the API
          name: 'some_string',
    
          // field is required or not
          required: true,
    
          // optional field description, can be a string or a language object
          description: 'Some description',
    
          // optional pre-set value of this field. A string in case of a text field, an options object in case of an autocomplete field
          value: 'Some value string',
    
          // Optionally set field to private - this data won't be public
          private: true,
    
          // Repeatable field, for text and group fields only
          repeatable: true,
    
          // Selectable options, for the autocomplete type field only. Can be:
          // * an array of option objects like below
          // * an API service: 'orcid', 'ror', 'geonames', 'getty', 'sheets'
          // * an array of API services ['orcid', 'ror'] (note: not sheets for now)
          options: [
            // this is an options object
            { 
              // can be a string or language object
              label: 'Some label',
              // value is a string, gets sent to server
              value: 'some_string',
            }
          ],
          
          // In case Google Sheets is selected as API, you must provide a sheetOptions object
          sheetOptions: {
            sheetId: 'ID of the Google Sheet',
            page: 'Spread name inside the Sheet',
            startAtRow: number, start displaying data from this row onwards, counting starts at 0,
            labelCol: number, start counting at 0, for the column that contains the display label,
            valueCol: number, for the column that contains the value,
            headerCol: optional number, needed in case you have a list that contain values that need to be indicated with a header in the dropdown,
          },
    
          // In case an array of typeahead services is provided, pick the default service (required)
          multiApiValue: "orcid",
    
          // Multiple selections possible, only for autocomplete field type
          multiselect: true,
    
          // An array of inputfields (text, autocomplete, etc), only for group field type
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