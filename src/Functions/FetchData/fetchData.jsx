
export const fetchData = async (setCData,setProds,setRProds, id) => {
      try {
        const response = await import(`../../../src/components/Table/data/${id}`)
        // const response = await axios.get(`http://localhost:8085/get_bill/${id}`)
        setCData(response.default.clientDetails);
        setProds(response.default.billItems);
        setRProds(response.default.returns);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

      