; (function () {
  console.log(123)
  const todos = [
    {
      id: 1,
      title: '工作',
      done: false
    },
    {
      id: 2,
      title: '看书',
      done: false
    },
    {
      id: 3,
      title: '旅行',
      done: false
    },
    {
      id: 4,
      title: '摄影',
      done: true
    }
  ]
  new Vue({

    el: '#todoapp',
    data: {
      inputText: '',
      todos,
      currentEdit:null,//用来判定任务项是否获的editing 的样式的一个标记变量
      backTitle:''

    },
    methods: {
      // 添加任务
      addTodo() {
        // 解构赋值,单独拿到文本框及任务列表数据
        const { inputText, todos } = this
        // 非空验证。为空时，
        if(inputText.trim().length === 0){
          return
        }
        // 获取唯一的id
        const lastItem = todos[todos.length-1]
        const id = lastItem ?lastItem.id+1 : 1
        
        // 将值添加到列表中
        todos.push({
          id,
          title: inputText,
          done: false
        })
        // 添加文本后让输入框设置为空
        this.inputText = ''
      },

      // 删除任务项
      removeTodo(index){
        // 删除任务项时要传入当前li 的index 值（下标）
        this.todos.splice(index,1)
      },

      // 获取当前项
      getEditing (item) {
        // 赋值给currentEdit
        this.currentEdit = item
        this.backTitle = item.title
      },

      // 回车或者失焦的时候保存编辑
      saveEdit (item,index) {
        // 判断任务项是否为空，如果为空，直接删除
        if (item.title.trim().length === 0){
          this.todos.splice(index,1)
        } else {
          // 保存以后就删除编辑edit 样式
          this.currentEdit = null
        }
      },

      // ESC取消编辑
      // 取消编辑的时候同时触发了失去焦点的事件了
      cancelEdit () {
        // 让任务项的 title 回归原始数据
				// 这里一旦取消编辑去除编辑样式，则会导致 blur 的事件触发
				// blur 事件函数 saveEdit 中要访问 this.currentEdit.title
				// 所以就报错了，因为 this.currentEdit 已经在这里被设置为 null 了
        // null.title 就报错了
        console.log(131)
        this.currentEdit.title = this.backTitle
        // 取消编辑，去除编辑样式
				this.currentEdit = null
      }
      
    }
  })
})();
