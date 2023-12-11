import { TaskProps } from "@/types/Task";

type AddAction = {
    type: 'add';
    payload: {
        taskName: string;
        id: string;
    };
};

type ToggleDoneAction = {
    type: 'toggleDone';
    payload: {
        id: string;
    };
};

type DeleteAction = {
    type: 'remove';
    payload: {
        id: string;
    };
};

type EditTextAction = {
    type: 'editText';
    payload: {
        id: string;
        text: string;
    };
};

type TypeProps = AddAction | ToggleDoneAction | DeleteAction | EditTextAction;

export function taskReducer(list: TaskProps[], type: TypeProps) {
    switch (type.type) {
        case 'add':
            return [...list, { id: type.payload.id, name: type.payload.taskName,  isChecked: false }];
        case 'remove':
            return list.filter((item) => item.id !== type.payload.id);
        case 'toggleDone':
            return list.map((item) => {
                if (item.id === type.payload.id) {
                    return {
                        ...item,
                        isChecked: !item.isChecked,
                    };
                }

                return item;
            });
        case 'editText': 
            return list.map((item) => {
                if (item.id === type.payload.id) {
                    return {
                        ...item,
                        name: type.payload.text,
                    };
                }
                return item;
            });
        default: return list;
    }
}