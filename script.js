const createOrderLink = order => {
	/*const val =
    '<div> <div class="close_modal_btn" onClick="close()">x</div> <p class="infoBoXTOP"><a target ="_blank" href= https://tophatter.com/admin/invoices/' +
    order +
    '>order link click </a></p></div>'

  document.body.innerHTML += val*/
	/*
  const val =
    '<li><a id ="HS_orderlink" href="#" target="_blank" rel="noreferrer noopener">Search by Order#' +
    order +
    ' <i class="icon-file"></i></a></li>'
  document.getElementById('menu_custom_links').innerHTML += val
*/

	document.getElementById('order-link').href += order;
	let val = document.getElementById('order-search').style.display;
	//alert(val);
	val = document.getElementById('order-search').style.display = 'list-item';
	//alert(val);
};
const close = () => {
	alert('close');
};
const addInvoiceId = order => {
	document.getElementById('custom-invoice-id').value = order;
};

const searchOrderNumber = () => {
	//get becon
	let BeaconHistoryTimelineListItem = document.getElementsByClassName('c-BeaconHistoryTimelineListItem');
	//tepm get the lat one
	let lastBeacon = BeaconHistoryTimelineListItem[BeaconHistoryTimelineListItem.length - 1];
	let anchorTag = lastBeacon.getElementsByTagName('a')[0].innerText;
	if (anchorTag.indexOf('#') != -1) {
		let order = anchorTag.split('#')[1];
		order = order.split('|')[0];
		return parseInt(order);
	} else return 0;
};

const run = () => {
	let domain = document.domain;
	let loc = location;
	//	alert(`your location is ${location}`);
	if (domain === 'secure.helpscout.net') {
		if (location.href.indexOf('conversation')) {
			//If the invoice id is already here we simply create a link
			const invoiceIdField = document.getElementById('custom-invoice-id');
			if (invoiceIdField.value === '') {
				const order = searchOrderNumber();
				if (order != 0) {
					addInvoiceId(order);
					createOrderLink(order);
					alert(` we found ${order}`);
				} else alert('we found nothing');
			} else createOrderLink(invoiceIdField.value);
		}
	}
};
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.message === 'hello') {
		const { url } = request;
		alert(`Will moved to ${url}`);
		location.replace(url);
		run();
	}
});
run();
