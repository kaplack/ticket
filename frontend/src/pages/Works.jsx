import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { getWorks, reset } from '../features/work/workSlice';
import Spinner from '../components/Spinner';
import JobList from '../components/JobList/JobList';
import SectionJobsSidebar from './WorksLayout/SectionJobsSidebar';
import SectionRecordsFilter from './WorksLayout/SectionRecordsFilter';
import SectionPagination from '../components/Pagination';

function convertToISO(date) {
  if (typeof date === 'string' && !isNaN(Date.parse(date))) {
    return new Date(date).toISOString();
  } else if (date instanceof Date) {
    return date.toISOString();
  } else {
    return null;
  }
}

const sortedWorks = (allWorks = [], sortBy) => {
  const sorted = [...allWorks]; // Crear una copia para no mutar el original

  // Convertir fechas a ISO 8601
  sorted.forEach(work => {
    if (work.createdAt && work.createdAt.$date) {
      work.createdAt.$date = convertToISO(work.createdAt.$date);
    }
  });

  if (sortBy === 'most_recent') {
    sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt) );
  } else if (sortBy === 'highest_salary') {
    sorted.sort((a, b) => (b.workPay || 0) - (a.workPay || 0));
  }

  return sorted;
};

function Works() {
  const { allWorks, isLoading, isSuccess } = useSelector((state) => state.work);
  const [currentPage, setCurrentPage] = useState(1); // Estado para el número de página actual
  const [itemsPerPage, setItemsPerPage] = useState(10); // Estado para el número de ítems por página
  const [sortBy, setSortBy] = useState('most_recent'); // Estado para el criterio de ordenamiento
  const [searchTerm, setSearchTerm] = useState('') // Estado para la busqueda
  const [locationTerm, setLocationTerm] = useState('') // Estado de busqueda para la ubicación

  // Paginación - Calcula el índice del primer y último elemento de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const sorted = sortedWorks(allWorks, sortBy);
  //search
  const filteredData = sorted.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
    item.location.toLowerCase().includes(locationTerm.toLowerCase())
  )
  const pages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const _pagination = {
    pages,
    currentPage,
    setCurrentPage
  };

  const _searchFiltered = {
    searchTerm,
    setSearchTerm,
    locationTerm,
    setLocationTerm
  }

  const _filterConfig = {
    prefix: 'Mostrando',
    type: 'trabajos',
    total: allWorks.length,
    showRange: false,
    showingUpto: '',
    itemsPerPage,
    setItemsPerPage,
    sortBy,
    setSortBy
  };

  const jobsFiltered = currentItems;

  return (
    <>
      <div className="section-full p-t120 p-b90 site-bg-white">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-12 rightSidebar">
              <SectionJobsSidebar _searchFiltered={_searchFiltered} />
            </div>
            <div className="col-lg-8 col-md-12">
              {/*Filter Short By*/}
              <SectionRecordsFilter _config={_filterConfig} />
              <JobList jobsFiltered={jobsFiltered} />
              <SectionPagination _pagination={_pagination} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Works;
