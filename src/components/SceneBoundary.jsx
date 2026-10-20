import { Component } from 'react';

// The 3D hero is decorative. If WebGL or the model fails, keep the page alive and render nothing.
export default class SceneBoundary extends Component {
    state = { failed: false };

    static getDerivedStateFromError() {
        return { failed: true };
    }

    componentDidCatch(error) {
        if (import.meta.env.DEV) console.warn('[Hero 3D scene disabled]', error);
    }

    render() {
        return this.state.failed ? null : this.props.children;
    }
}
