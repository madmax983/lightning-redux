public with sharing class TodoController {

    @auraEnabled
    public static List<Todo__c> getTodos() {
        List<Todo__c> todoList = [SELECT Id, Name, Completed__c, Text__c FROM Todo__c];
        return todoList;
    }

    @auraEnabled
    public static Todo__c updateTodo(Todo__c todo) {
        upsert todo;
        return todo;
    }

    @auraEnabled
    public static void completeTodo(Todo__c todo) {
        todo.Completed__c = !todo.Completed__c;
        update todo;
    }

    @auraEnabled
    public static void deleteTodo(Todo__c todo){
        delete todo;
    }

    @auraEnabled
    public static void completeAllTodos(Todo__c[] todos){
        for(Todo__c todo : todos){
            if(!todo.Completed__c){
                todo.Completed__c = true;
            }
        }

        update todos;
    }

    @auraEnabled
    public static void removeCompletedTodos(Todo__c[] todos){
        List<Todo__c> todosToBeDeleted = new List<Todo__c>();

        for(Todo__c todo : todos){
            if(todo.Completed__c){
                todosToBeDeleted.add(todo);
            }
        }

        delete todosToBeDeleted;
    }
}
