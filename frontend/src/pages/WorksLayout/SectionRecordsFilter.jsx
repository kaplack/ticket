import { useState } from "react";

function SectionRecordsFilter({ _config }) {

    // Manejador de cambio cuando el usuario selecciona una nueva opción
    const handleSortChange = (e) => {
        _config.setSortBy(e.target.value);
    };

    // Manejador de cambio cuando el usuario selecciona una nueva cantidad de items por página
    const handleItemsPerPageChange = (e) => {
        _config.setItemsPerPage(e.target.value);
    };

    return (
        <>
            <div className="product-filter-wrap d-flex justify-content-between align-items-center m-b30">
                <span className="woocommerce-result-count-left">
                    {
                        _config.prefix
                    }
                    {
                        _config.showRange ? (" 1-" + _config.showingUpto + " of ") : " "
                    }
                    {
                        _config.total + " " + _config.type
                    }
                </span>
                <form className="woocommerce-ordering twm-filter-select" method="get">
                <span className="woocommerce-result-count">Ordenar por</span>
                    <select
                        className="wt-select-bar-2"
                        value={_config.sortBy}
                        onChange={handleSortChange}
                        data-style="btn-primary"
                        data-live-search="true"
                        data-bv-field="size"
                    >
                        <option value="most_recent">Más reciente</option>
                        <option value="highest_salary">Mayor salario</option>
                    </select>
                    <select
                        className="wt-select-bar-2"
                        data-live-search="true"
                        data-bv-field="size"
                        value={_config.itemsPerPage}
                        onChange={handleItemsPerPageChange}
                    >
                        <option value={5}>Mostrar 5</option>
                        <option value={10}>Mostrar 10</option>
                        <option value={20}>Mostrar 20</option>
                        <option value={30}>Mostrar 30</option>
                        <option value={40}>Mostrar 40</option>
                        <option value={50}>Mostrar 50</option>
                        <option value={60}>Mostrar 60</option>
                    </select>
                </form>
            </div>
        </>
    )
}

export default SectionRecordsFilter;