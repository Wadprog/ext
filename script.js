const createOrderLink = order => {
  document.getElementById('order-link').href += order
  let val = document.getElementById('order-search').style.display
  alert(val)
  val = document.getElementById('order-search').style.display = 'list-item'
  alert(val)
}

const addInvoiceId = order => {
  document.getElementById('custom-invoice-id').value = order
}

const searchOrderNumber = () => {
  //get beacons
  let BeaconHistoryTimelineListItem = document.getElementsByClassName(
    'c-BeaconHistoryTimelineListItem'
  )
  if (BeaconHistoryTimelineListItem) {
    if (!Array.isArray(BeaconHistoryTimelineListItem)) {
      for (let beacon of BeaconHistoryTimelineListItem) {
        var order = getorderFormAnchorsinBeacon(beacon)
        if (order != 0) return order
      }
      return 0
    } else {
      alert('Iam not an array ')
      return getorderFormAnchorsinBeacon(BeaconHistoryTimelineListItem)
    }
  }
}

const getorderFormAnchorsinBeacon = beacon => {
  alert(` I am beacon ${beacon}`)
  let anchors = beacon.getElementsByTagName('a')
  if (anchors) {
    if (!Array.isArray(anchors)) {
      for (let anchor of anchors) {
        var order = getOrderFromAnchor(anchor)
        if (order != 0) return order
      }
      return 0
    } else {
      var order = getOrderFromAnchor(anchors)
      return order === 0 ? 0 : order
    }
  }
}
const getOrderFromAnchor = anchor => {
  let value = anchor.innerText
  if (value.indexOf('Order #') != -1) {
    let order = value.split('#')[1]
    order = order.split('|')[0]
    return parseInt(order)
  }
  return 0
}
const run = () => {
  let domain = document.domain

  alert(`your location is ${location}`)
  if (domain === 'secure.helpscout.net') {
    if (location.href.indexOf('conversation') != -1) {
      //If the invoice id is already here we simply create a link
      window.onload = () => {
        const invoiceIdField = document.getElementById('custom-invoice-id')
        alert(` aki estoy ${invoiceIdField}`)
        if (invoiceIdField.value === '') {
          alert('I have nothing in me')
          const order = searchOrderNumber()
          if (order != 0) {
            addInvoiceId(order)
            createOrderLink(order)
            alert(` we found ${order}`)
          } else alert('we found nothing')
        } else createOrderLink(invoiceIdField.value)
      }
    }
  }
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (
    document.domain === 'secure.helpscout.net' &&
    location.href != 'https://secure.helpscout.net/search/' &&
    location.href != 'https://secure.helpscout.net/?hsSearch=true'
  ) {
    if (request.message === 'hello') {
      const { url } = request
      alert(`Will moved to ${url}`)
      location.replace(url)
    }
  }
})
run()
