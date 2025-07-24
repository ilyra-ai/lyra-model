import argparse
from datasets import load_dataset
from transformers import AutoTokenizer, AutoModelForCausalLM, Trainer, TrainingArguments

parser = argparse.ArgumentParser()
parser.add_argument('--dataset', required=True)
parser.add_argument('--epochs', type=int, default=1)
parser.add_argument('--batch-size', type=int, default=1)
parser.add_argument('--base-model')
args = parser.parse_args()

model_name = args.base_model or 'gpt2'
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)

raw = load_dataset('text', data_files=args.dataset)

def tokenize(batch):
    return tokenizer(batch['text'], truncation=True, padding='max_length')

dataset = raw['train'].map(tokenize)

training_args = TrainingArguments('models', num_train_epochs=args.epochs, per_device_train_batch_size=args.batch_size)
trainer = Trainer(model=model, args=training_args, train_dataset=dataset)
trainer.train()
model.save_pretrained('models/fine_tuned')
