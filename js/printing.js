function createMultiPageDocument() {
    // Define header and footer height
    const headerHeight = document.getElementById('header-container').clientHeight;
    const footerHeight = document.getElementById('footer-container').clientHeight;

    const pageMaxHeight = 960;

    const headerHtml = document.getElementById('header-container').innerHTML;
    const footerHtml = document.getElementById('footer-container').innerHTML;
    const area = document.getElementById('page-drawing-area');

    area.innerHTML = "";

    const numRows = tableData.length;

    // Calculate body height excluding header and footer
    const bodyHeight = pageMaxHeight - (headerHeight + footerHeight);

    let rowsCount = 0;

    let pageDiv = document.createElement('div');
    pageDiv.classList.add('page');
    pageDiv.classList.add('content');
    pageDiv.classList.add('page-break');
    area.appendChild(pageDiv);

    // Add header to the page
    let headerDiv = document.createElement('div');
    headerDiv.innerHTML = headerHtml;
    pageDiv.appendChild(headerDiv);

    // Add footer to the page
    let footerDiv = document.createElement('div');
    footerDiv.innerHTML = footerHtml;

    // add table to the body
    let tableBody = document.createElement('table');
    pageDiv.appendChild(tableBody);

    let rowDiv = document.createElement('tr');
    rowDiv.classList.add('table-title');

    for (let j = 0; j < columns.length; j++) {
        const col = columns[j];
        let cellH = document.createElement('h2');
        cellH.textContent = col.title;
        let cellDiv = document.createElement('td');
        cellDiv.appendChild(cellH);
        rowDiv.appendChild(cellDiv);
    }
    tableBody.appendChild(rowDiv);

    // Loop through pages
    for (let i = rowsCount; i < numRows; i++) {
        // Add row to the page
        let rowElement = document.createElement('tr');
        rowElement.classList.add('table-row');
        const row = tableData[i];
        rowsCount = i;

        for (let j = 0; j < columns.length; j++) {
            const col = columns[j];
            let cellDiv = document.createElement('td');
            cellDiv.classList.add('item-text');
            cellDiv.textContent = row[col.field];
            rowElement.appendChild(cellDiv);
        }
        tableBody.appendChild(rowElement);
        const rowHeight = rowElement.clientHeight;

        if (pageDiv.clientHeight > bodyHeight + (headerHeight + rowHeight)) {
            // remove the last row added
            tableBody.removeChild(rowElement);
            // new page should be created
            // Add footer to the page
            let footerDiv = document.createElement('div');
            footerDiv.innerHTML = footerHtml;
            pageDiv.appendChild(footerDiv);

            pageDiv = document.createElement('div');
            pageDiv.classList.add('page');
            pageDiv.classList.add('content');
            pageDiv.classList.add('page-break');
            area.appendChild(pageDiv);

            // Add header to the page
            headerDiv = document.createElement('div');
            headerDiv.innerHTML = headerHtml;
            pageDiv.appendChild(headerDiv);

            // add table to the body
            tableBody = document.createElement('table');
            pageDiv.appendChild(tableBody);

            // Add row to the page
            let rowDiv = document.createElement('tr');
            rowDiv.classList.add('table-row');
            const row = tableData[i];
            rowsCount = i;

            for (let j = 0; j < columns.length; j++) {
                const col = columns[j];
                let cellDiv = document.createElement('td');
                cellDiv.classList.add('item-text');
                cellDiv.textContent = row[col.field];
                rowDiv.appendChild(cellDiv);
            }
            tableBody.appendChild(rowDiv);
        }
    }

    pageDiv.appendChild(footerDiv);
}

// Call the function to create the document
createMultiPageDocument();

window.print();
