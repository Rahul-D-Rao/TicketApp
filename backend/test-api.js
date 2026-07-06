const url = 'http://localhost:5000/api/tickets';
(async () => {
  try {
    const all = await fetch(url);
    const data = await all.json();
    console.log('GET', all.status, Array.isArray(data) ? data.length : typeof data, data[0]?._id || data[0]?.id);
    if (Array.isArray(data) && data[0]) {
      const id = data[0]._id || data[0].id;
      const patch = await fetch(`${url}/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'In Progress' })
      });
      console.log('PATCH', patch.status, await patch.text());
      const del = await fetch(`${url}/${id}`, { method: 'DELETE' });
      console.log('DELETE', del.status, await del.text());
    }
  } catch (e) {
    console.error(e);
  }
})();
