# Refactoring

used MVC Design Pattern as a way of separating concerns. 

1. Model - represents the object. It can also have logic to update controller if it's data changes.
2. View - represents the visualization of the data the model contains.
3. Controller - acts on both model and the view. It controls the data flow into model objects and updates the view whenever the data changes. It keeps view and model separate.

Added some mapping logic to ride entity to have the same output as what it is going in so the front-end should not have to be changed to adapt.