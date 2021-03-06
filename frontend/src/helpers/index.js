function getCookie(name) {
    if (!document.cookie) {
      return null;
    }
    const token = document.cookie.split(';')
      .map(c => c.trim())
      .filter(c => c.startsWith(name + '='));

    if (token.length === 0) {
      return null;
    }
    return decodeURIComponent(token[0].split('=')[1]);
  }



export function deleteAPICall(model, pk, token) {
	const url = "/api/destroy/" + model + "/" + pk + "/"

	return fetch(url, {
		method:"delete",
		headers: {
			Authorization: "Token " + token,
		}
	})
}

export function updateAPICall(model, pk, data, token, updateInURL = false, media = false) {
	var url = "/api/" + model + "/" + pk + "/"
	var headers = { Authorization: "Token " + token}
	var body;

	if (media) {
		body = data;
	}
	else {
		headers["content-type"] = "application/json";
		body = JSON.stringify(data);
	}

	if (updateInURL) {
		url = "/api/update/" + model + "/" + pk + "/"
	}

	return fetch(url, {
		method:'put',
		headers,
		body:body
	})
}

export function createAPICall(model, data, token, media) {
	const url = "/api/create/" + model + "/"
	var body;
	console.log(data);

	var headers = { Authorization: "Token " + token}

	if (media) {
		body = data;
	}
	else {
		headers["content-type"] = "application/json";
		body = JSON.stringify(data);
	}

	return fetch(url, {
		method:'post',
		headers,
		body:body
	})
}


export function retrieveAPICall(model, pk) {
	const url = "/api/" + model + "/" + pk + "/"
	return fetch(url)
}


export function fetchAPICall(model, list) {
	const url = "/api/" + model + "/"

	var queries = list.map((pk) => {
		return fetch(url + pk + '/')//, {
		// 	headers: {
		// 		Authorization: "Token " + token,
		// 		"Content-Type":"application/json",
		// 	}
		// })
		.then(response => response.json())
	})
	
	return queries
}

export function fetchListAPICall(model) {
	const url = "/api/list/" + model + "/"

	return fetch(url)//, {
		// headers: {
		// 	Authorization: "Token " + token,
		// }
	//})
}

export function incrementAPICall(model, pk) {
	const url = "/api/increment/" + model + "/" + pk + "/"

	return fetch(url)
}
