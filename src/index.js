const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  	return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  	const { title, url, techs } = request.body

  	const repository = {
		id: uuid(),
		title,
		url,
		techs,
		likes: 0
  	};

  	repositories.push(repository);

  	return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
	const { id } = request.params;
	const { title, url, techs } = request.body;
  
  	repositoryIndex = repositories.find((repository) => repository.id === id);

	if (!repositoryIndex) {
		return response.status(404).json({ error: "Repository not found" });
	}

	repositoryIndex.title = title ? title : repositoryIndex.title;
	repositoryIndex.url = url ? url : repositoryIndex.url;
	repositoryIndex.techs = techs ? techs : repositoryIndex.techs;

	return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
	const { id } = request.params;

	repositoryIndex = repositories.findIndex(
		(repository) => repository.id === id
	);
  
	if (repositoryIndex < 0) {
		return response.status(404).json({ error: "Repository not found" });
	}
  
	repositories.splice(repositoryIndex, 1);
  
	return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
	const { id } = request.params;

	repositoryIndex = repositories.find((repository) => repository.id === id);

	if (!repositoryIndex) {
		return response.status(404).json({ error: "Repository not found" });
	}

	repositoryIndex.likes += 1;

	return response.json({ likes: repositoryIndex.likes });
});

module.exports = app;