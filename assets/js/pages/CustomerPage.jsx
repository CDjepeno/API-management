import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Pagination from '../components/Pagination';
import CustomersAPI from "../Services/customersAPI";

const CustomerPage = (props) => {

    const [customers,setCustomers]      = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch]           = useState("");

    // Permet d'aller récupérer les customers
    const fetchCustomers = async () => {
        try {
            const data = await CustomersAPI.findAll()
            setCustomers(data);
        } catch(error) {
            toast.error("impossible de charger les clients");
        }
    }
    
    // Au chargement du composant ont va chercher les customers
    useEffect(() => {
        fetchCustomers()
    }, []);
    
    // Gestion de la suppression d'un customer
    const handleDelete = async id => {
        const originalCustomers = [...customers];
        setCustomers(customers.filter(customer => customer.id !== id))
        
        try {
            await CustomersAPI.delete(id)
            toast.success("Le client a bien été supprimer");
        } catch(error) {
            setCustomers(originalCustomers);
            toast.success("La suppression n'a pas fonctionnier");
        }
    };

    // Gestion du changement de page
    const handlePageChange = page => setCurrentPage(page);
    
    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(1);
    }

    // initialisation des items par page
    const itemsPerPage        = 10;
    // Filtrage des customers en fonction de la recherche
    const filteredCustomers   = customers.filter(c => c.firstName.toLowerCase().includes(search.toLowerCase()) ||
                                                      c.lastName.toLowerCase().includes(search.toLowerCase()) ||
                                                      c.email.toLowerCase().includes(search.toLowerCase()) ||
                                                      (c.company && c.company.toLowerCase().includes(search.toLowerCase()))
                                                );
    // Pagination des données
    const paginatiedCustomers = Pagination.getData(filteredCustomers, currentPage, itemsPerPage)
    return(
        <>
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <h1>Liste des clients</h1>
                <Link to="customers/new" className="btn btn-primary">Creér un client</Link>
            </div>

            <div className="form-group">
                <input type="text" onChange={handleSearch} className="form-control" value={search} placeholder="Rechercher..."/>
            </div>

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
                    {paginatiedCustomers.map(customer => 
                        <tr key={customer.id}>
                            <th>{customer.id}</th>
                            <th>
                                <Link to={ "/customers/" + customer.id }>{customer.lastName} {customer.firstName}</Link>
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
            {itemsPerPage < filteredCustomers.length && ( 
                <Pagination 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage} 
                    length={filteredCustomers.length} 
                    onPageChanged={handlePageChange} 
                />
            )}
            
        </>
    );
}
export default CustomerPage;