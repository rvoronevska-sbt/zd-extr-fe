export function useCSVExport(dataTable, filteredRows, processedCustomers, formatDate) {
    const escapeCSVField = (field) => {
        if (field == null) return '';
        const str = Array.isArray(field) ? field.join('; ') : String(field);
        return str.includes(',') || str.includes('"') || str.includes('\n') ? `"${str.replace(/"/g, '""')}"` : str;
    };

    const exportToCSV = () => {
        if (!dataTable.value) {
            alert('Table not ready');
            return;
        }

        const dataToExport = filteredRows.value?.length > 0 ? filteredRows.value : processedCustomers.value || [];

        if (!dataToExport.length) {
            alert('No data to export');
            return;
        }

        alert(`Exporting ${dataToExport.length} filtered rows`);

        const headers = ['Date', 'Topic', 'Ticket ID', 'Brand', 'VIP Level', 'Customer Email', 'Agent Email', 'CSAT Score', 'Chat Tags', 'Chat Transcript', 'Email Transcript', 'Sentiment', 'Summary'];

        const rows = dataToExport.map((customer) => [
            formatDate(customer.timestamp),
            customer.topic || 'none',
            customer.ticketid || 'none',
            customer.brand || 'none',
            customer.vip_level || 'none',
            customer.customer_email || 'none',
            customer.agent_email || 'none',
            customer.csat_score || 'none',
            Array.isArray(customer.chat_tags) ? customer.chat_tags.join('; ') : customer.chat_tags || 'No Data',
            customer.chat_transcript || 'No Data',
            customer.email_transcript || 'No Data',
            customer.sentiment || 'No Data',
            customer.summary || 'No Data'
        ]);

        const csvLines = [headers.map(escapeCSVField).join(','), ...rows.map((row) => row.map(escapeCSVField).join(','))];

        const csvString = csvLines.join('\r\n');
        const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
        const blob = new Blob([bom, csvString], { type: 'text/csv;charset=utf-8;' });

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `customers-${new Date().toLocaleDateString('en-CA')}.csv`;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return { exportToCSV };
}
