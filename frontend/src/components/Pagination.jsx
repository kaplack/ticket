import { FaAngleRight, FaAngleLeft,FaEllipsisH } from "react-icons/fa";

function SectionPagination({_pagination}) {
    const { pages, currentPage, setCurrentPage } = _pagination;

    // Manejar el cambio de página
    const handlePageChange = (page) => {
        
        if (page > 0 && page <= pages) {
            setCurrentPage(page);
        }
    };

    // Generar los números de página
    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= pages; i++) {
            pageNumbers.push(
                <li key={i} className={i === currentPage ? "active" : ""}>
                    <a href="#" onClick={() => handlePageChange(i)}>{i}</a>
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="pagination-outer">
            <div className="pagination-style1">
                <ul className="clearfix">
                    {pages > 1 && (
                        <li className="prev">
                            <a href="#" onClick={() => handlePageChange(currentPage - 1)}>
                                <span><FaAngleLeft /></span>
                            </a>
                        </li>
                    )}
                    {renderPageNumbers()}
                    {pages > 1 && (
                        <li className="next">
                            <a href="#" onClick={() => handlePageChange(currentPage + 1)}>
                                <span><FaAngleRight /></span>
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default SectionPagination;