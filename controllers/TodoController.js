const Todo = require("../models/Todo")

module.exports = {
    async createTodo(req, res) {
        try {
            const task = await Todo.create({
                userId: req.body.userId,
                title: req.body.title,
                description: req.body.description
            });
    
            res.status(201).json({ message: "Success add task", data: task });
        } catch (error) {
            res.status(500).json({ message: "Failed add task" });
        }
    },
    
    async getAllTodo(req, res) {
        try {
            const tasks = await Todo.find({
                userId: req.params.userId
            }).sort({ _id: -1 })
            res.json({ message: 'Success get all tasks', data: tasks})
        } catch (error) {
            res.status(500).json({ message: "Pengaduan gagal ditampilkan" });
        }
    },
    
    async getTodoById(req, res) {
        try {
            const report = await Pengaduan.findOne({
                where: {
                    id_report: req.params.id,
                },
            });
    
            if (!report) {
                res.status(400).json({ message: "Report tidak dapat ditemukan" });
                return;
            }
    
            res.status(200).json(report);
        } catch (error) {
            res.status(500).json({ message: "Report gagal ditampilkan" });
        }
    },
    
    async updateTodo(req, res) {
        try {
            const report = await Pengaduan.findOne({
                where: {
                    id_report: req.params.id_report,
                },
            });
    
            if (!report) {
                res.status(400).json({ message: "Report tidak dapat ditemukan" });
                return;
            }
    
            await Pengaduan.update(req.body, {
                where: {
                    id_report: req.params.id_report,
                },
            });
    
            res.status(200).json({ message: "Report berhasil diupdate" });
        } catch (error) {
            res.status(500).json({ message: "Report gagal diupdate" });
        }
    },
    
    async deleteTodo(req, res) {
        try {
            const { id } = req.params
            const filter = { _id: id }
            const task = await Todo.deleteOne(filter)

            res.status(200).json({
                message: 'Success delete task!',
                data: task
            })
        } catch (error) {
            res.status(500).json({
                message: 'Failed delete task'
            })
        }
    },

    async todoTask(req, res) {
        try {
            const { id } = req.params
            const filter = { _id: id }
            const update = { status: 'TODO' }
            const task = await Todo.findOneAndUpdate(filter, update)

            res.status(200).json({
                message: 'Success change status to todo',
                data: task
            })
        } catch (error) {
            res.status(500).json({
                message: 'Failed change status'
            })
        }
    },

    async ongoingTask(req, res) {
        try {
            const { id } = req.params
            const filter = { _id: id }
            const update = { status: 'ONGOING' }
            const task = await Todo.findOneAndUpdate(filter, update)

            res.status(200).json({
                message: 'Success change status to ongoing',
                data: task
            })
        } catch (error) {
            res.status(500).json({
                message: 'Failed change status'
            })
        }
    },
    
    async doneTask(req, res) {
        try {
            const { id } = req.params
            const filter = { _id: id }
            const update = { status: 'DONE' }
            const task = await Todo.findOneAndUpdate(filter, update)

            res.status(200).json({
                message: 'Success change status to done',
                data: task
            })
        } catch (error) {
            res.status(500).json({
                message: 'Failed change status'
            })
        }
    }
}