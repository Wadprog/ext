const createOrderLink = order => {
	document.getElementById('order-link').href += order;
	let val = document.getElementById('order-search').style.display;
	alert(val);
	val = document.getElementById('order-search').style.display = 'list-item';
	alert(val);
};

const somefnc = () => {
	const ticketEditing = document.getElementById('ticketEditing');

	if (ticketEditing) {
		const img = ticketEditing.getElementsByTagName('img')[0];
		alert('ticket viewing is there ');
		if (img) {
			alert(` We found the image ${img.getAttribute('alt')} `);
			return img.classList.contains('reply');
		}
	} else {
		alert('we found nothing');
		return false;
	}
};
const ifReplierLeft = () => {};
const isSomeoneReplying = () => {
	/*
  const emptyDiv = viewingReplying.getElementsByTagName('div')[0];*/
	const SectionViewingReplying = document.getElementById('js-viewingReplying');
	const emptyDiv = SectionViewingReplying.getElementsByTagName('div')[0];

	var observer = new WebKitMutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			let lent = mutation.addedNodes.length;
			let nodez = mutation.addedNodes;
			if (somefnc()) {
				alert('Some function triggered');
				blockReply();
			}
		});
	});
	observer.observe(emptyDiv, {
		childList: true
	});

	return somefnc();

	//const noClassDiv = emptyDiv.getElementsByTagName('div')[0];

	//if (noClassDiv) {

	//}
};

const blockReply = () => {
	alert('We are blocking you from responding');
	let replyAnchor = document.getElementById('navReply');
	var new_element = replyAnchor.cloneNode(true);
	replyAnchor.parentNode.replaceChild(new_element, replyAnchor);
	replyAnchor.setAttribute('data-original-title', 'Someone is responding ->');
	replyAnchor.classList.add('isDisabledBB');
};
const addInvoiceId = order => {
	document.getElementById('custom-invoice-id').value = order;
};

const searchOrderNumber = () => {
	//get beacons
	let BeaconHistoryTimelineListItem = document.getElementsByClassName('c-BeaconHistoryTimelineListItem');
	if (BeaconHistoryTimelineListItem) {
		if (!Array.isArray(BeaconHistoryTimelineListItem)) {
			for (let beacon of BeaconHistoryTimelineListItem) {
				var order = getorderFormAnchorsinBeacon(beacon);
				if (order != 0) return order;
			}
			return 0;
		} else {
			alert('Iam not an array ');
			return getorderFormAnchorsinBeacon(BeaconHistoryTimelineListItem);
		}
	}
};

const getorderFormAnchorsinBeacon = beacon => {
	alert(` I am beacon ${beacon}`);
	let anchors = beacon.getElementsByTagName('a');
	if (anchors) {
		if (!Array.isArray(anchors)) {
			for (let anchor of anchors) {
				var order = getOrderFromAnchor(anchor);
				if (order != 0) return order;
			}
			return 0;
		} else {
			var order = getOrderFromAnchor(anchors);
			return order === 0 ? 0 : order;
		}
	}
};
const getOrderFromAnchor = anchor => {
	let value = anchor.innerText;
	if (value.indexOf('Order #') != -1) {
		let order = value.split('#')[1];
		order = order.split('|')[0];
		return parseInt(order);
	}
	return 0;
};
const run = () => {
	let domain = document.domain;

	alert(`your location is ${location}`);
	if (domain === 'secure.helpscout.net') {
		if (location.href.indexOf('conversation') != -1) {
			//If the invoice id is already here we simply create a link
			window.onload = () => {
				if (!isSomeoneReplying()) {
					const invoiceIdField = document.getElementById('custom-invoice-id');
					alert(` aki estoy ${invoiceIdField}`);
					if (invoiceIdField.value === '') {
						alert('I have nothing in me');
						const order = searchOrderNumber();
						if (order != 0) {
							addInvoiceId(order);
							createOrderLink(order);
							alert(` we found ${order}`);
						} else alert('we found nothing');
					} else createOrderLink(invoiceIdField.value);
				} else blockReply();
			};
		}
	}
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (
		document.domain === 'secure.helpscout.net' &&
		location.href != 'https://secure.helpscout.net/search/' &&
		location.href != 'https://secure.helpscout.net/?hsSearch=true'
	) {
		if (request.message === 'hello') {
			const { url } = request;
			alert(`Will moved to ${url}`);
			location.replace(url);
		}
	}
});
run();
