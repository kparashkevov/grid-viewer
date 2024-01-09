import GridCell from "./GridCell"

type IGridView = { colDatas: IGridLayout, profiles: any, activeProfile: string }

const baseWidth = 214;

function filter(profiles: any, activeProfile: string, e: ICellData): boolean {
    if (activeProfile == 'None') {
        return true
    }
    const searchedValue = e.rowData.type == 'Task' ? e.rowData.ownedBy : e.rowData.techOwner
    return profiles[activeProfile].indexOf(searchedValue) > -1
}

function GridView(props: IGridView) {

    return (
        <>
            <table>
                <thead>
                    <tr style={{ display: "flex" }}>
                        {props.colDatas.col0.entries.filter(e1 => filter(props.profiles, props.activeProfile, e1)).length > 0 &&
                            <th style={{ width: `${baseWidth}px` }}>{props.colDatas.col0.colName}</th>}
                        {props.colDatas.col1.entries.filter(e1 => filter(props.profiles, props.activeProfile, e1)).length > 0 &&
                            <th style={{ width: `${baseWidth}px` }}>{props.colDatas.col1.colName}</th>}
                        {props.colDatas.col2.entries.filter(e1 => filter(props.profiles, props.activeProfile, e1)).length > 0 &&
                            <th style={{ width: `${baseWidth}px` }}>{props.colDatas.col2.colName}</th>}
                        {props.colDatas.col3.entries.filter(e1 => filter(props.profiles, props.activeProfile, e1)).length > 0 &&
                            <th style={{ width: `${baseWidth}px` }}>{props.colDatas.col3.colName}</th>}
                        {props.colDatas.col4.entries.filter(e1 => filter(props.profiles, props.activeProfile, e1)).length > 0 &&
                            <th style={{ width: `${baseWidth}px` }}>{props.colDatas.col4.colName}</th>}
                        {props.colDatas.col5.entries.filter(e1 => filter(props.profiles, props.activeProfile, e1)).length > 0 &&
                            <th style={{ width: `${baseWidth}px` }}>{props.colDatas.col5.colName}</th>}
                        {props.colDatas.col6.entries.filter(e1 => filter(props.profiles, props.activeProfile, e1)).length > 0 &&
                            <th style={{ width: `${baseWidth}px` }}>{props.colDatas.col6.colName}</th>}
                        {props.colDatas.col7.entries.filter(e1 => filter(props.profiles, props.activeProfile, e1)).length > 0 &&
                            <th style={{ width: `${baseWidth}px` }}>{props.colDatas.col7.colName}</th>}
                        {props.colDatas.col8.entries.filter(e1 => filter(props.profiles, props.activeProfile, e1)).length > 0 &&
                            <th style={{ width: `${baseWidth}px` }}>{props.colDatas.col8.colName}</th>}
                        {props.colDatas.col9.entries.filter(e1 => filter(props.profiles, props.activeProfile, e1)).length > 0 &&
                            <th style={{ width: `${baseWidth}px` }}>{props.colDatas.col9.colName}</th>}
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ display: "flex" }}>
                        <GridColStruct activeProfile={props.activeProfile} profiles={props.profiles} col={props.colDatas.col0} />
                        <GridColStruct activeProfile={props.activeProfile} profiles={props.profiles} col={props.colDatas.col1} />
                        <GridColStruct activeProfile={props.activeProfile} profiles={props.profiles} col={props.colDatas.col2} />
                        <GridColStruct activeProfile={props.activeProfile} profiles={props.profiles} col={props.colDatas.col3} />
                        <GridColStruct activeProfile={props.activeProfile} profiles={props.profiles} col={props.colDatas.col4} />
                        <GridColStruct activeProfile={props.activeProfile} profiles={props.profiles} col={props.colDatas.col5} />
                        <GridColStruct activeProfile={props.activeProfile} profiles={props.profiles} col={props.colDatas.col6} />
                        <GridColStruct activeProfile={props.activeProfile} profiles={props.profiles} col={props.colDatas.col7} />
                        <GridColStruct activeProfile={props.activeProfile} profiles={props.profiles} col={props.colDatas.col8} />
                        <GridColStruct activeProfile={props.activeProfile} profiles={props.profiles} col={props.colDatas.col9} />
                    </tr>
                </tbody>
            </table>
        </>
    )
}

type IGridColStructProps = { col: IColumnData, profiles: any, activeProfile: string }

function GridColStruct(props: IGridColStructProps) {
    return (
        <>
            {props.col.entries.filter(e1 => filter(props.profiles, props.activeProfile, e1)).length > 0 ?
                <td style={{ flexDirection: "column", display: "flex", width: `${baseWidth}px` }}>
                    {props.col.entries.filter(e1 => filter(props.profiles, props.activeProfile, e1)).map((e, i) => {
                        return <GridCell color={e.color} rowData={e.rowData} key={i} />
                    })}
                </td> : null}
        </>
    )
}

export default GridView