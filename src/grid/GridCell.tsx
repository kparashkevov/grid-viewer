import { useEffect, useState } from "react"

const iconMap: any = {
    "Task": "&#128203;",
    "Bug": "&#128030;",
    "Story": "&#128220;"
}

function GridCell(props: ICellData) {

    const [cellColor, setCellColor] = useState(props.color)

    useEffect(() => {
        setCellColor(props.color)
    }, [props])
    

    return (
        <>
            <div style={{
                backgroundColor: `rgba(${cellColor})`, 
                margin: "5px 0",
                padding: "1px 0",
                borderRadius: "10%", 
                color: "black", 
                fontWeight: "bold", 
                maxWidth: "208px", 
                height: "164px",
                border: "3px solid rgb(180,180,180)"
            }}>
                <span dangerouslySetInnerHTML={{ __html: `${iconMap[props.rowData.type]} ${props.rowData.id}` }}></span>
                <br />
                <span style={{
                    height: "34px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "block",
                    textDecoration: "underline"
                }}>{`${props.rowData.summary}`}</span>
                <span dangerouslySetInnerHTML={{ __html: `&#128295; ${props.rowData.type == 'Task' ? props.rowData.ownedBy : props.rowData.techOwner}` }}></span>
                <br />
                {props.rowData.type != 'Task' ?
                    <>
                        <span dangerouslySetInnerHTML={{ __html: `&#128296; ${props.rowData.qaOwner}` }}></span>
                        <br /></> : null
                }
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <span style={{ width: "33.3%" }}>QA</span>
                    <span style={{ width: "33.3%" }}>BA</span>
                    <span style={{ width: "33.3%" }}>WS</span>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <span style={{ width: "33.3%" }} dangerouslySetInnerHTML={{ __html: `${props.rowData.qaConfirmed ? '&#9745;' : '&#9744;'}` }}></span>
                    <span style={{ width: "33.3%" }} dangerouslySetInnerHTML={{ __html: `${props.rowData.baConfirmed ? '&#9745;' : '&#9744;'}` }}></span>
                    <span style={{ width: "33.3%" }} dangerouslySetInnerHTML={{ __html: `${props.rowData.wsConfirmed ? '&#9745;' : '&#9744;'}` }}></span>
                </div>
                <br />
                {props.rowData.type != 'Task' ?
                    <span style={{fontWeight: "bold"}}>{"Rls: " + props.rowData.relIteration}</span> : null
                }
            </div>
        </>
    )
}

export default GridCell