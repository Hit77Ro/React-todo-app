=================== useState ======================
-> when the state of a component changes, it triggers a re-render of the entire component.
-> never set stat manually (eg. counter = 0 ) ;
-> only change it by it's setter function (eg.setCounter)

=> when a stat changes , it's value is not immedialty update , it's updated to new value after the re-render of the component

=> after a stat changes react re-render the entire component ,then update the stat to it's new value and parse jsx element to html  
\*\*

    When a state changes in a React component, React triggers a re-render of that specific component, not the entire application.

    React re-renders the component and updates the state to its new value,

    During the re-render, React compares the virtual DOM representation of the component (generated from JSX) with the previous virtual DOM representation.

    React determines the minimal set of changes required to update the real DOM to match the new virtual DOM.

    After identifying the changes, React only updates the specific parts of the real DOM that need to change, not the entire DOM tree.

    The new JSX elements are compared with the previous ones to determine what has changed, and React applies the necessary updates efficiently.

    React also optimizes the rendering process using a technique called "reconciliation" to minimize unnecessary DOM manipulations.

<Note !!
<button onClick={ callback(value)} ></button>
when the component is renderd the callback is immediatly called
without even clicking on the button

=================== seEffect ===========================
-> run immediatly after the component is renderd
-> run after every render
-> A useEffect with a dependency array runs once after the initial mounting of the component, and it also runs whenever the value of the dependency changes. 

###### <parametres callback function , dependency array

<dependency-array :

> => It allows you to specify dependencies that will trigger the effect to run only when certain values change.
> => If the dependency array is empty, the effect runs only once after the initial render.

<Clean-up-Function:

> 1)-> it's returned by the effect function
> 2)-> it's executed when the component unmounts(deleted from the Dom , or no longer needed )
> 3)-> Role : performing any necessary clean-up tasks before the component is removed from the DOM, such as canceling network requests, unsubscribing from event listeners, or clearing timers.

<Examples:

> 1)-> useEffect(() => alert("hello") );
> => alert function will run after every render (eg . stat changes..)
> 2)-> useEffect(() => alert("hello") ,[counter]);
> => alert function will run whenever ( counter) changes it's value ?
> 3)-> useEffect(() => alert("hello") ,[]);
> => alert function will run once after the component is rendered
> \*/
