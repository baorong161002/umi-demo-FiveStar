// export default {
//     'get /ds/list' : function (req, res) {
//         res.json({
//             data: ['zhangsan','lisi','wangwu']
//         })
//     }
// }
const users = [
   { id: 1,
     name:"zhangsan"
   },
   { id :2,
     name:"里斯"
   },
   { id:3,
    name:"王五"
   },
   {
    id:4,
    name:"菜六"
   },
   {
    id:5,
    name:"枸杞"
   }
]


export default {
    'GET /ds/list': (req, res)=> {
       //res.status(200).json({data: ['zhangsan','lisi','wangwu']})
       res.status(200).json(users)

    },
    'POST /api/users': (req, res) => {
        const data = req.body
        if(!data || !data.id) {
            res.status(400).json()
            return
        }
        const exists = users.find(p=>p.id==data.id)
        if(exists){
            // @ts-ignore
            exists = {...data}
        } else {
            users.push(data)
        }
        res.status(200).json()
    },
    'DELETE /api/users': (req, res) => {
        const data = req.body
        if(!data || !data.id) {
            res.status(400).json()
            return
        }
        const exists = users.findIndex(p=>p.id==data.id)
        if(exists && exists>=0){
            users.splice(exists, 1)
        } else {
            res.status(200).json()
        }

        console.log(users)
        res.status(200).json()
    },
}