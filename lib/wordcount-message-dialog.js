"use babel";

import React, { useEffect, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useModal } from "inkdrop";

const WordcountMessageDialog = (props) => {
    const [count, setCount] = useState(0);
    const noteBody = useSelector(selectEditingNotebody);

    const modal = useModal();

    const { Dialog } = inkdrop.components.classes;

    const countWords = useCallback(() => {
        return noteBody.split(/\s+/).length;
    }, [noteBody]);

    const toggle = useCallback(() => {
        setCount(countWords());
        modal.show();
    }, [countWords]);

    useEffect(() => {
        const sub = inkdrop.commands.add(document.body, {
            "wordcount:toggle": toggle,
        });
        return () => sub.dispose();
    }, [toggle]);

    return (
        <Dialog {...modal.state} onBackdropClick={modal.close}>
            <Dialog.Title>Wordcount</Dialog.Title>
            <Dialog.Content>There are {count} words.</Dialog.Content>
            <Dialog.Actions>
                <button className="ui button" onClick={modal.close}>
                    Close
                </button>
            </Dialog.Actions>
        </Dialog>
    );
};

export default WordcountMessageDialog;

function selectEditingNotebody({ editingNote }) {
    return editingNote ? editingNote.body : "";
}
