# arlington-ma-town-member-voting

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
