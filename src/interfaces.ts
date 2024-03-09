type IRowData = { type: string, id: number, summary: string, status: string, ownedBy: string, techOwner: string, qaOwner: string, qaConfirmed: boolean, baConfirmed: boolean, wsConfirmed: boolean, relIteration: string }
type ICellData = { color: string, rowData: IRowData }
type IColumnData = { colName: string, entries: ICellData[]}
type IGridLayout = {col0: IColumnData, col1: IColumnData, col2: IColumnData, col3: IColumnData, col4: IColumnData, col5: IColumnData, col6: IColumnData, col7: IColumnData, col8: IColumnData, col9: IColumnData}