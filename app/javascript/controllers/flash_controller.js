import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['message']

  toggleWith ({ detail: { message } }) {
    this.setMessage(message)
    this.open()

    if (this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      this.close()
    }, 5000)
  }

  setMessage (message) {
    this.messageTarget.textContent = message
  }

  close () {
    this.element.classList.add('hidden')
  }

  open () {
    this.element.classList.remove('hidden')
  }
}
