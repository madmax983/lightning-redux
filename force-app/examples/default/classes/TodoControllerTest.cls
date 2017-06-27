@isTest
public with sharing class TodoControllerTest {

    @testSetup static void setupTestData() {
        List<Todo__c> todoList = new List<Todo__c>();

        Todo__c tenaciousTodo = new Todo__c(
            Text__c='This is not the greatest task in the world'
        );
        todoList.add(tenaciousTodo);

        Todo__c zilTodo = new Todo__c(
                Text__c='Find the universe\'s ultimate cup of coffee'
        );
        todoList.add(zilTodo);

        Todo__c toadDo = new Todo__c(
                Text__c='The Princess is in another castle'
        );
        todoList.add(toadDo);

        insert todoList;

    }

    static testMethod void testGetTodos() {
        List<Todo__c> todos = TodoController.getTodos();
        system.assertEquals(3, todos.size());
    }

    static testMethod void testUpdateTodo() {
        Todo__c taoDo = new Todo__c(
                Text__c='OOM'
        );

        insert taoDo;

        taoDo.Text__c = 'MOO';

        TodoController.updateTodo(taoDo);

        Todo__c currentTodo = [SELECT Id, Text__c FROM Todo__c WHERE Id =: taoDo.Id];
        system.assertEquals('MOO', currentTodo.Text__c);

    }

    static testMethod void testCompleteTodo() {
        List<Todo__c> todos = TodoController.getTodos();

        TodoController.completeTodo(todos[0]);

        List<Todo__c> completedTodos = [SELECT Id, Text__c, Completed__c FROM Todo__c WHERE Completed__c = TRUE];
        system.assertEquals(1, completedTodos.size());
    }

    static testMethod void testDeleteTodo() {
        List<Todo__c> todos = TodoController.getTodos();

        TodoController.deleteTodo(todos[0]);
        todos = TodoController.getTodos();
        system.assertEquals(2, todos.size());
    }

    static testMethod void testCompleteAllTodos() {
        List<Todo__c> todos = TodoController.getTodos();

        TodoController.completeAllTodos(todos);
        List<Todo__c> completedTodos = [SELECT Id, Text__c, Completed__c FROM Todo__c WHERE Completed__c = TRUE];
        system.assertEquals(3, completedTodos.size());
    }

    static testMethod void testRemoveCompletedTodos() {
        List<Todo__c> todos = TodoController.getTodos();

        TodoController.completeAllTodos(todos);
        TodoController.removeCompletedTodos(todos);

        todos = TodoController.getTodos();
        system.assertEquals(0, todos.size());
    }
}