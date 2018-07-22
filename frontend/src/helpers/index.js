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



export function deleteAPICall(model, pk, title, token) {
	const url = "/api/destroy/" + model + "/" + pk + "/"

	var confirmed = window.confirm("Are you sure you want to delete the following objective: " + title +"?");

	if (confirmed) {
		return fetch(url, {
			method:"delete",
			headers: {
				Authorization: "Token " + token,
			}
		})
	}
}

export function updateAPICall(model, pk, data, token, updateInURL) {
	var url = "/api/" + model + "/" + pk + "/"
	const csrftoken = getCookie('csrftoken')

	if (updateInURL) {
		url = "/api/update/" + model + "/" + pk + "/"
	}

	return fetch(url, {
		method:'put',
		mode: 'same-origin',
		headers: {
			Authorization: "Token " + token,
			"Content-Type":"application/json",
			'X-CSRFToken': csrftoken
		},
		body:JSON.stringify(data)
	})
}

export function createAPICall(model, data, token) {
	const url = "/api/create/" + model + "/"

	return fetch(url, {
		method:'post',
		headers: {
			"content-type":"application/json",
			Authorization: "Token " + token,
		},
		body:JSON.stringify(data)
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
