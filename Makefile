run-as-prod:
	docker build . -t vsa:latest && docker run --rm -i -t -e PORT=8080 -p 8080:8080 vsa:latest

deploy-to-prod:
    # https://devcenter.heroku.com/articles/heroku-cli#download-and-install
    # https://devcenter.heroku.com/articles/container-registry-and-runtime
    #
	# Do these two commented-out steps on a first deploy. Unnecessary on subsequent deploys
	#heroku login
	#heroku container:login
	docker build . -t vsa:latest
	heroku container:push web -a vote-smart-arlington
	heroku container:release web -a vote-smart-arlington
