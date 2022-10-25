const formularioCrearProducto = document.getElementById(
  'formulario-crear-producto'
)

const updateTable = async () => {
  const tableContentElement = document.getElementById('table-content')
  tableContentElement.innerHTML = ''

  const response = await fetch(`/api/products`)
  const { data } = await response.json()

  data.forEach((product) => {
    pushProductRow(product)
  })
}

const crearFormulario = (data) => {
  const { id, title, price, thumbnail } = data

  const editForm = document.createElement('form')
  editForm.setAttribute('id', `formulario-editar-producto`)

  editForm.innerHTML = `
  <div class="mb-3">
    <label for="title-edit" class="form-label">Titulo</label>
    <input
      type="text"
      class="form-control"
      id="title-edit"
      name="title"
      placeholder="Ingrese el titulo del articulo"
      value="${title}"
    />
  </div>
  <div class="mb-3">
    <label for="price-edit" class="form-label">Precio</label>
    <div class="input-group mb-3">
      <span class="input-group-text">$</span>
      <input
        name="price"
        type="number"
        class="form-control"
        aria-label="Precio"
        value="${price}"
      />
    </div>
  </div>
  <div class="mb-3">
    <label for="thumbnail-edit" class="form-label">URL Imagen</label>
    <input
      type="text"
      class="form-control"
      id="thumbnail-edit"
      name="thumbnail"
      value="${thumbnail}"
      placeholder="Ingrese la url de la imagen"
    />
  </div>
  <div class="d-flex justify-content-between">
    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Guardar cambios</button>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
      Cerrar
    </button>
  </div>`

  editForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const payload = Object.fromEntries(data.entries())

    const response = await fetch(`/api/products/${id}`, {
      body: JSON.stringify(payload),
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    await updateTable()
  })

  return editForm
}

const pushProductRow = (product) => {
  const { id, title, price, thumbnail } = product
  const tableContentElement = document.getElementById('table-content')
  const tr = document.createElement('tr')
  tr.innerHTML = `
  <th scope="row">${id}</th>
      <td>${title}</td>
      <td>${price}</td>
      <td><a href="${thumbnail}">Link a la imagen</a></td>
      <td>
        <button
          type="button"
          class="btn btn-warning"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          <i class="bi bi-pencil-square"></i>
        </button>
        <button
          type="button"
          class="btn btn-danger"
        >
        <i class="bi bi-trash3-fill"></i>
        </button>
    </td>`
  const button = tr.getElementsByTagName('button')
  button[0].addEventListener('click', async (e) => {
    const response = await fetch('/api/products/' + id)
    const { data } = await response.json()

    const editForm = crearFormulario(data)
    const modalBody = document.getElementById('modal-body-edit')
    modalBody.innerHTML = ''
    modalBody.appendChild(editForm)
  })

  button[1].addEventListener('click', async (e) => {
    await fetch('/api/products/' + id, { method: 'DELETE' })
    await updateTable()
  })

  tableContentElement.appendChild(tr)
}

formularioCrearProducto.addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = new FormData(e.target)
  const payload = Object.fromEntries(data.entries())
  const response = await fetch(`/api/products`, {
    body: JSON.stringify(payload),
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  if (response.status === 201) {
    pushProductRow(await response.json())
  }
  e.target.reset()
})

const initTable = async () => {
  const response = await fetch(`/api/products`)
  const { data } = await response.json()

  for (let i = 0; i < data.length; i++) {
    pushProductRow(data[i])
  }
}

initTable()
