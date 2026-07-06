import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TicketList.css";

function TicketList({ refreshCount }) {
  const [tickets, setTickets] = useState([]);

  const formatCreatedAt = (dateString, id) => {
    let date;
    if (dateString) {
      date = new Date(dateString);
      if (Number.isNaN(date.getTime())) date = null;
    }

    if (!date && id && typeof id === "string" && id.length === 24) {
      const timestampSeconds = parseInt(id.substring(0, 8), 16);
      date = new Date(timestampSeconds * 1000);
    }

    if (!date || Number.isNaN(date.getTime())) return "N/A";

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${day}/${month}/${year}, ${String(hours).padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;
  };

  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tickets");
      setTickets(res.data);
    } catch (error) {
      console.error("Fetch tickets error:", error);
      alert("Error fetching tickets");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/tickets/${id}/status`,
        { status }
      );

      fetchTickets();
    } catch (error) {
      console.error(
        "Update status error:",
        error.response?.data || error.message
      );

      alert(
        `Error updating status: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  };

  const deleteTicket = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ticket?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/tickets/${id}`);

      fetchTickets();
    } catch (error) {
      console.error(
        "Delete ticket error:",
        error.response?.data || error.message
      );

      alert(
        `Error deleting ticket: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [refreshCount]);

  return (
    <div className="ticket-list-card">
      <div className="ticket-list-header">
        <h2>🎫 Support Tickets</h2>
        <p>Track, update, and manage all support tickets in one place.</p>
      </div>

      {tickets.length === 0 ? (
        <p className="ticket-empty">No tickets found.</p>
      ) : (
        tickets.map((ticket) => (
          <div key={ticket._id} className="ticket-item">
            <div className="ticket-item-header">
              <div>
                <h3>{ticket.title}</h3>

                <span
                  className={`status-badge status-${ticket.status
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                >
                  {ticket.status}
                </span>
              </div>

              <div className="ticket-meta">
                <span>
                  <strong>Priority:</strong> {ticket.priority}
                </span>

                <span>
                  <strong>Created By:</strong> {ticket.createdBy}
                </span>

                <span>
                  <strong>Created At:</strong> {formatCreatedAt(ticket.createdAt, ticket._id)}
                </span>
              </div>
            </div>

            <p className="ticket-description">
              {ticket.description || "No description provided."}
            </p>

            <div className="ticket-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() =>
                  updateStatus(ticket._id, "In Progress")
                }
              >
                In Progress
              </button>

              <button
                type="button"
                className="button button-success"
                onClick={() =>
                  updateStatus(ticket._id, "Resolved")
                }
              >
                Resolved
              </button>

              <button
                type="button"
                className="button button-danger"
                onClick={() => deleteTicket(ticket._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TicketList;