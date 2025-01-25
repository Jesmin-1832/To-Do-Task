import { useEffect, useState } from "react";
 
function Todo() {
    var [data, setData] = useState([]);
    var [active, setActive] = useState("All");
  
    useEffect(() => {
        var setlocal = JSON.parse(localStorage.getItem('Task'));
        if (setlocal == null) {
            setData([]);
        }
        else {
            setData(setlocal);
        }
    }, setData);

    var submitTodo = (e) => {
        e.preventDefault()
        var obj = {
            name: e.target.taskname.value,
            id: Math.round(Math.random() * 100000),
            active: false,
        }
        var newdata = ([...data, obj]);
        setData(newdata);
        localStorage.setItem('Task', JSON.stringify(newdata));
        e.target.taskname.value = "";
    }

    var deleteTask = (id) => {
        let pos = data.findIndex(v => v.id == id);
        // alert("Data Delete..")
        data.splice(pos, 1);
        setData(data);
        localStorage.setItem('Task', JSON.stringify(data));
        let localRecord = JSON.parse(localStorage.getItem('Task'));
        setData(localRecord);
    }

    var complete = (id) => {
        // console.log(id);
        var updatedData = data.map((task) =>
            task.id === id ? { ...task , active: true } : task
        );
        setData(updatedData);
        localStorage.setItem('Task', JSON.stringify(updatedData));
    };

    var filteredTasks = data.filter((task) => {
        if (active === "All") return true;
        if (active === "Pending") return !task.active;
        if (active === "Completed") return task.active;
        return false;
    });


    return (
        <div className="container"><br />
            <div className="box">
                <div className="box2">
                    <h1>THINGS TO DO</h1>
                    <form method="post" onSubmit={(e) => submitTodo(e)}>
                        <div>
                            <input className="addinput" type="text" name="taskname" placeholder="Add New" />
                        </div>
                    </form>

                    <div className="tasks">
                        {active == "All"
                            ?
                            filteredTasks.map((v, index) => {
                                return (
                                    <div key={v.id}>
                                        {v.active == true ?
                                            < div className="viewtask d-flex">
                                                <div className="d-flex">
                                                    <label style={{ width: "35px" }}>  {index + 1}.   </label>
                                                    <input type="checkbox" checked value={complete.id} name="checktask" onChange={() => complete(v.id)} />
                                                    <label for='checktask' >{v.name}</label>
                                                </div>
                                                <div>
                                                    <button className="btn" onClick={(e) => deleteTask(v.id)}>✖️</button>
                                                </div>
                                            </div>
                                            :
                                            < div className="viewtask d-flex">
                                                <div className="d-flex">
                                                    <label style={{ width: "35px" }}>  {index + 1}.   </label>
                                                    <input type="checkbox" value={v.id} name="checktask" onChange={() => complete(v.id)} />
                                                    <label for='checktask' >{v.name}</label>
                                                </div>
                                                <div>
                                                    <button className="btn" onClick={(e) => deleteTask(v.id)}>✖️</button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                            })
                            :
                            active == "Pending"
                                ?
                                filteredTasks.map((v, index) => {
                                    return (

                                        <div key={v.id}>
                                            {v.active == false ?
                                                < div className="viewtask d-flex">
                                                    <div className="d-flex">
                                                        <label style={{ width: "35px" }}>  {index + 1}.   </label>
                                                        <input type="checkbox" value={v.id} name="checktask" onChange={() => complete(v.id)} />
                                                        <label for='checktask' >{v.name}</label>
                                                    </div>
                                                    <div>
                                                        <button className="btn"  onClick={(e) => deleteTask(v.id)}>✖️</button>
                                                    </div>
                                                </div>
                                                : ""
                                            }
                                        </div>
                                    )
                                })
                                :
                                active == "Completed"
                                    ?
                                    filteredTasks.map((v, index) => {
                                        return (

                                            <div key={v.id}>
                                                {v.active == true ?
                                                    < div className="viewtask d-flex">
                                                        <div className="d-flex">
                                                            <label style={{ width: "35px" }}>  {index + 1}.   </label>
                                                            <input type="checkbox" checked value={v.id} name="checktask" onChange={() => complete(v.id)} />
                                                            <label for='checktask' >{v.name}</label>
                                                        </div>
                                                        <div>
                                                            <button className="btn" onClick={(e) => deleteTask(v.id)}>✖️</button>
                                                        </div>
                                                    </div>
                                                    : ""
                                                }
                                            </div>
                                        )
                                    })
                                    : ""

                        }
                    </div>

                </div>
                <div className="box3 d-flex">
                    <div>
                        <button style={{ cursor: "pointer", display: "inline-block", backgroundColor: "transparent", border: "0", fontSize: "30px", margin: "0 10px" }}>+</button>
                        <button style={{ cursor: "pointer", display: "inline-block", backgroundColor: "transparent", border: "0", fontSize: "25px" }}>🔍</button>
                        <h2 style={{ display: "inline-block", color: "#ada0a0", margin: "0 10px" }}> | </h2>
                        <h3 style={{ display: "inline-block", color: "grey", fontSize: "25px", fontWeight: "normal" }}> {data.length} items left</h3>
                    </div>
                    <div>
                        <input type="submit" className="btn-2" value="All" onClick={() => setActive("All")} />
                        <input type="submit" className="btn-2" value="Pending" onClick={() => setActive("Pending")} />
                        <input type="submit" className="btn-2" value="Completed" onClick={() => setActive("Completed")} />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Todo;