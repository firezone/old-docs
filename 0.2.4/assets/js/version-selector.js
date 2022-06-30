let populateSelect = function (versions) {
  let latest = versions[0]
  let selects = document.querySelectorAll('.version-selector')

  let path_parts = window.location.pathname.split('/')
  let url_version = path_parts[1]

  versions.forEach(version => {
    let option = document.createElement('option')
    option.value = version
    option.innerText = version
    if (version === latest) option.innerText += ' (latest)'
    selects.forEach(select => {
      select.append(option)
    })
  })

  selects.forEach(select => {
    if (versions.indexOf(url_version) === -1) select.value = latest
    else select.value = url_version
  })

  selects.forEach(select => {
    select.addEventListener('change', (e) => {
      let path = e.target.selectedIndex === 0 ? '/' : e.target.value
      window.location.href = path
    })
  })
}

document.addEventListener('DOMContentLoaded', () => {

  fetch('/assets/versions.txt')
  .then(response => response.text())
  .then(text => {
    populateSelect(text.trim().split("\n"))
  })
  .catch(error => {
    console.error(error)
  })
})
