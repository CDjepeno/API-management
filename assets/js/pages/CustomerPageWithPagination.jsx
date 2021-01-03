import React, { useEffect, useState } from 'react';
import axios from "axios";
import Pagination from '../components/Pagination';

const CustomerPageWithPagination = (props) => {

    const [customers,setCustomers]      = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totaItems, setTotalItems]    = useState(0);
    const [loading, setLoading]         = useState(true)
    const itemsPerPage                  = 10;


    useEffect(() => {
        axios.get(`https://localhost:8000/api/customers?pagination=true&count=${itemsPerPage}&page=${currentPage}`)
        .then(response => {
            setCustomers(response.data['hydra:member']);
            setTotalItems(response.data['hydra:totalItems']);
            setLoading(false);
        })
        .catch(error   => console.log(error.response))
    },[currentPage])

    const handleDelete = id => {

        const originalCustomers = [...customers];

        // 1. l'approche optimiste
        setCustomers(customers.filter(customer => customer.id !== id))
    
        // 2. l'approche pessimiste
        
        axios.delete("https://localhost:8000/api/customers/" + id)
        .then(response => console.log("ok"))
        .catch(error => {
            setCustomers(originalCustomers);
            console.log(error.response)
        })
    };

    const handlePageChange = page => {
        setLoading(true)
        setCurrentPage(page);
    }

    // Gestion de la pagination
    const paginatiedCustomers = Pagination.getData(customers, currentPage, itemsPerPage)

    return(
        <>
            <h1>Liste des clients (Pagination)</h1>

            <table className=" table table-hover bg-primary">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Entreprise</th>
                        <th className="text-center">Factures</th>
                        <th className="text-center">Montant total</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {loading && (
                        <tr>
                            <td>chargement ...</td>
                        </tr>
                    ) }
                    {!loading && customers.map(customer => 
                        <tr key={customer.id}>
                            <th>{customer.id}</th>
                            <th>
                                <a href="#">{customer.lastName} {customer.firstName}</a>
                            </th>
                            <th>{customer.email}</th>
                            <th>{customer.company}</th>
                            <th className="text-center">
                                <span className="badge badge-light p-2">
                                {customer.invoices.length}
                                </span>
                            </th>
                            <th className="text-center">{customer.totalAmount.toLocaleString()} €</th>
                            <th>
                                <button disabled={customer.invoices.length > 0} className="btn btn-sm btn-danger" onClick={() => handleDelete(customer.id)}>
                                    Supprimer
                                </button>
                            </th>
                        </tr>
                    )}
                    
                </tbody>
            </table>
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={totaItems} onPageChanged={handlePageChange} />
            

        </>
    );
}
export default CustomerPageWithPagination;