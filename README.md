# Vote Smart Arlington

Vote Smart Arlington is an effort to present Arlington, MA town member voting records in a novel and accessible way. Our site gives Arlington town residents the ability to select their precinct and view their town meeting members' voting history for all of 2020, which we hope will serve as an informational resource as we approach the municipal election on April 10, 2021.

<img width="1372" alt="Screen Shot 2022-11-04 at 1 01 33 PM" src="https://user-images.githubusercontent.com/5703736/200033481-4807654e-832b-467f-b094-4b9d6b47e9ef.png">


## Local Development

Consult the READMEs in each of the respective directories for API development and front-end development.

## Deployment

### Dependencies

Deployment is currently done by pushing Docker images into the Heroku container registry.

Deployment requires the Heroku CLI: 

```bash
brew tap heroku/brew && brew install heroku
```

When Docker and the Heroku CLI are installed on your system, you can use the Makefile here
at the top of the repo for running a deployment. You may need the owner of the Heroku app (Graham)
to add you as a collaborator.

## License

This project is built using the CopyLeft, GPL-3.0 License. The text of this license can be found [here](./LICENSE)
