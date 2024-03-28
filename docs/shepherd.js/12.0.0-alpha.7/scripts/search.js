(function() {
  const input = document.querySelector('#search')
  const targets = [ ...document.querySelectorAll('#sidebarNav li')]
  input.addEventListener('keyup', () => {
    // loop over each targets and hide the not corresponding ones
    targets.forEach(target => {
      if (!target.innerText.toLowerCase().includes(input.value.toLowerCase())) {
        target.style.display = 'none'

        /**
         * Detects an empty list
         * Remove the list and the list's title if the list is not displayed
         */
        const list = [...target.parentNode.childNodes].filter( elem => elem.style.display !== 'none')

        if (!list.length) {
          target.parentNode.style.display = 'none'
          target.parentNode.previousSibling.style.display = 'none'
        }

        /**
         * Detects empty category
         * Remove the entire category if no item is displayed
         */
        const category = [...target.parentNode.parentNode.childNodes]
          .filter( elem => elem.tagName !== 'H2' && elem.style.display !== 'none')

        if (!category.length) {
          target.parentNode.parentNode.style.display = 'none'
        }
      } else {
        target.parentNode.style.display = 'block'
        target.parentNode.previousSibling.style.display = 'block'
        target.parentNode.parentNode.style.display = 'block'
        target.style.display = 'block'
      }
    })
  })
})()