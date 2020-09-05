window.onload = () => {
    $('.todo-toggle').on('click', (e)=>{
        let id = e.target.dataset.id;
        let status = e.target.dataset.status;
        $.ajax({
            url: `http://localhost:3000/todos/${id}/set_status?_method=PUT`,
            method: 'PUT',
            data: {
                status,
            },
            error: (err) => console.log(err),
            success: (res) => { 
                return res.message;
            }
        })
        .then((res)=>{
            if(res.message === "success"){
                e.target.nextElementSibling.classList.toggle('todo-done');
            }
        });
    })
}