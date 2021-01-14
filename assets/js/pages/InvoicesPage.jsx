import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import InvoicesAPI from '../services/invoicesAPI';
import moment from 'moment';
import { Link } from 'react-router-dom';

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "info",
    CANCELLED: "danger"
}

const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée",
}

const InvoicePage = (props) => {
    
    const [invoices, setInvoices]       = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch]           = useState("");
    const itemsPerPage                  = 15;
    
    // On récupère les invoices
    const fetchInvoices = async () => {
        try {
            const data = await InvoicesAPI.findAll()
            setInvoices(data);
        } catch (error) {
            console.log(error.message)
        }
    } 
    
    // Au chargement du composant ont va chercher les invoices
    useEffect(() => {
        fetchInvoices()
    }, []);

    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    // Gestion de la suppression d'un customer
    const handleDelete = async id => {
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id))
        
        try {
            await InvoicesAPI.delete(id)
        } catch(error) {
            setInvoices(originalCustomers);
        }
    };

    // Gestion du changement de page
    const handlePageChange = page => setCurrentPage(page);

    // Gestion du format de date
    const formatDate = (str) => moment(str).format("DD/MM/YYYY")

    // Filtrage des customers en fonction de la recherche
    const filteredInvoices   = invoices.filter(i => STATUS_LABELS[i.status].toLowerCase().includes(search.toLowerCase()) ||
                                                    i.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
                                                    i.customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
                                                    i.amount.toString().startsWith(search.toLowerCase())
                                            );

    // pagination des données
    const paginatedInvoices = Pagination.getData(filteredInvoices, currentPage, itemsPerPage);

    return ( 
        <>
        <div className="d-flex justify-content-between align-items-center">
            <h1>Liste des factures</h1>
            <Link className="btn btn-primary" to="/invoices/new">Crée une facture</Link>
        </div>

        <div className="form-group">
            <input type="text" onChange={handleSearch} className="form-control" value={search} placeholder="Rechercher..."/>
        </div>

        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Numéro</th>
                    <th>Client</th>
                    <th>Date d'envoi</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Montant</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {paginatedInvoices.map(invoice =>
                    <tr key={invoice.id}>
                        <td>{invoice.chrono}</td>
                        <td>
                        <a href="#">{invoice.customer.lastName} {invoice.customer.firstName}</a> 
                        </td>
                        <td>{formatDate(invoice.sentAt)}</td>
                        <td className="text-center">
                            <span className={"p-2 badge badge-" + STATUS_CLASSES[invoice.status]}>
                                {STATUS_LABELS[invoice.status]}
                            </span>
                        </td>
                        <td className="text-center">{invoice.amount.toLocaleString()} €</td>
                        <td>
                            <Link to={"/invoices/" + invoice.id} className="btn btn-sm btn-warning mr-1">Editer</Link>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(invoice.id)}>Supprimer</button>
                        </td>
                    </tr>
                )}  
            </tbody>
        </table>

        <Pagination 
            currentPage={currentPage} 
            itemsPerPage={itemsPerPage} 
            length={filteredInvoices.length} 
            onPageChanged={handlePageChange} 
        />
        </>
     );
}
 
export default InvoicePage;