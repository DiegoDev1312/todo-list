import { TaskProps } from "@/types/Task";

type AddAction = {
    type: 'add';
    payload: {
        taskName: string;
    };
};

type ToggleDoneAction = {
    type: 'toggleDone';
    payload: {
        id: number;
    };
};

type DeleteAction = {
    type: 'remove';
    payload: {
        id: number;
    };
};

type TypeProps = AddAction | ToggleDoneAction | DeleteAction;

export function taskReducer(list: TaskProps[], type: TypeProps) {
    switch (type.type) {
        case 'add':
            return [...list, { id: list.length + 1, name: type.payload.taskName,  isChecked: false }];
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
        default: return list;
    }
}