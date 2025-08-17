function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="pagination">
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Anterior
      </button>
      <span>
        Página {page} de {totalPages}
      </span>
      <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>
        Próxima
      </button>
    </div>
  );
}

export default Pagination;
